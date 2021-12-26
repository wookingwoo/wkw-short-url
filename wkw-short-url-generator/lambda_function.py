import boto3
import os
import random
import string
import botocore
from botocore.client import Config


# 단축 URL에 쓰일 랜덤 키를 생성
# 알파벳 소문자와 숫자를 이용하여 n의 크기인 랜덤값 생성
def generate_random(n):
    return ''.join(random.SystemRandom().choice(string.ascii_lowercase +
                                                string.digits)
                   for _ in range(n))


# 생성된 랜덤 키가 S3에 등록될 수 있는지 확인 (랜덤키값이 이미 있는지 확인)
def is_key_available(s3_client, bucket, key):
    try:
        s3_client.head_object(Bucket=bucket, Key=key)
        return False
    except botocore.exceptions.ClientError as e:
        code = e.response['Error']['Code']
        if code == '403' or code == '404':
            return True
        raise e


def put_object_on_s3(s3, bucket_name, key, redirect_location):
    try:
        s3.put_object(Bucket=bucket_name,
                      Key=key,
                      Body=b'',
                      WebsiteRedirectLocation=redirect_location,
                      ContentType="text/plain")
        return True
    except Exception as e:
        print("Error: ", e)
        return False


def lambda_handler(event, context):
    native_url = event.get("native_url")
    s3 = boto3.client('s3', config=Config(
        signature_version='s3v4'))  # S3 연결을 위한 클라이언트

    BUCKET_NAME = os.environ['S3_BUCKET']  # 환경변수로 관리한다
    while (True):
        key_size = int(os.environ["SHORT_KEY_SIZE"])  # 사이즈 값은 환경변수로 관리한다
        short_id = generate_random(key_size)  # 생성할 키의 길이를 파라미터로 전달한다
        short_key = "url/" + short_id
        if is_key_available(s3, BUCKET_NAME, short_key):
            break  # 키 사용이 가능하면 while문을 나간다
        else:
            # 키가 이미 존재하면 재생성을 위해 다시 while문을 돈다
            print("short_key collision: " + short_key + ". Retrying.")

    # S3에 오브젝트를 추가하는 함수. 이후 구현할 예정이다
    is_put_success = put_object_on_s3(s3, BUCKET_NAME, short_key, native_url)
    if not is_put_success:
        short_id = None  # 오브젝트 추가에 실패하면 key는 실제로 없는 값이 되기에 변수에 None으로 저장한다

    return {
        "short_id": short_id,
        "forward_url": os.environ['FORWARD_HOST'],
        "native_url": native_url
    }
