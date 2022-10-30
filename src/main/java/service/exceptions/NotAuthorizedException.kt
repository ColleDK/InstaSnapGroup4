package service.exceptions

import java.lang.Exception

class NotAuthorizedException(s: String): Exception(s) {}