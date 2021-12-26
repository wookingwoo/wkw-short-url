import os
import boto3
from botocore.client import Config

# S3 버킷 이름을 담은 변수를 전역변수로 두었고 버킷 이름은 환경변수에 저장을 한다
S3_BUCKET = os.environ['S3_BUCKET']


def lambda_handler(event, context):
    # S3에 접근할 수 있도록 클라이언트를 생성한다
    s3 = boto3.client('s3', config=Config(signature_version='s3v4'))

    try:
        shorten_key = "url/" + \
            event.get("pathParameters").get("key")  # key값을 가져온다

        # S3 버킷에서 파일 경로를 Key에 지정한다
        resp = s3.head_object(Bucket=S3_BUCKET, Key=shorten_key)

        # origin url (S3 버킷에서 가져온 파일에 대해 WebsiteRedirectLocation 속성의 값을 가져온다.)
        redirect_url = resp.get('WebsiteRedirectLocation')

    except Exception as e:
        print(e)
        redirect_url = "https://" + os.environ["HOST"]
        # S3 버킷에 접속하면서 버킷이 존재하지 않거나 연결이 불안정한 이유로 예외가 발생할 수 있다.
        # 이러한 경우를 위해 redirect_url로 서비스의 주소로 가도록 설정하였다

    return {
        "statusCode": 301,
        "headers": {
            "Location": redirect_url
        },
        "isBase64Encoded": False,
    }
    #  301 Moved Permanently: 요청에 대해 헤더에 주어진 값으로 완전히 옮겨졌음을 나타낸다
