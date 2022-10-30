package service.models;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserRemote {
    public String firstName;
    public String lastName;
    public String email;
    public String password;
    public Long birthday;
}
