package service.models;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data @NoArgsConstructor
public class LoginRemote {
    public String email;
    public String password;
}
