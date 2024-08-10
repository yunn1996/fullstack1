package cn.yunn.getcontacts.repo;

import cn.yunn.getcontacts.domain.Contact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * 2024/8/6
 *
 * @author yunN
 */
@Repository
public interface ContactRepo extends JpaRepository<Contact, String> {
    Optional<Contact> findById(String id);
}
