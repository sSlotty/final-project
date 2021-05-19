class OAuthErrorResponse(object):
    def __init__(self, error: str, error_description: str) -> None:
        self.error = error
        self.error_description = error_description