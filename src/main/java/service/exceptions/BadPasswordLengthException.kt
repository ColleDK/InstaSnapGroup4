package service.exceptions

import java.lang.Exception

class BadPasswordLengthException(s: String): Exception(s) {}