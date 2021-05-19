class TokenResponse(object):
    def __init__(self, access_token: str, token_type: str, expires_in: int, refresh_token: str, staffID: str) -> None:
        self.access_token = access_token
        self.token_type = token_type
        self.expires_in = expires_in
        self.refresh_token = refresh_token
        self.staffID = staffID