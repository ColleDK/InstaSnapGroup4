package service.exceptions

import java.lang.Exception

class BadDataException(s: String): Exception(s) {}