package cn.yunn.getcontacts.domain;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import org.hibernate.annotations.UuidGenerator;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_DEFAULT;

/**
 * 2024/8/6
 *
 * @author yunN
 */
@Entity
@Data
// only output non-default values, i.e. null, empty, or default values will not be serialized in the res
@JsonInclude(NON_DEFAULT)
@Table(name = "contacts")
public class Contact {

    @Id
    @UuidGenerator
    @Column(name = "id", unique = true, updatable = false)
    private String id;
    private String name;
    private String email;
    private String title;
    private String phone;
    private String address;
    private String status;
    private String photoUrl;
}
