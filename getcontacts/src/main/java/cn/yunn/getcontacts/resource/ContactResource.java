package cn.yunn.getcontacts.resource;

import cn.yunn.getcontacts.constant.Constants;
import cn.yunn.getcontacts.domain.Contact;
import cn.yunn.getcontacts.service.ContactService;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Paths;

/**
 * 2024/8/6
 *
 * @author yunN
 */
@RestController
@RequestMapping("/contacts")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ContactResource {
    private final ContactService contactService;

    @PostMapping
    public ResponseEntity<Contact> createContact(@RequestBody Contact contact) {
        return ResponseEntity.created(URI.create("/contacts/userID")).body(contactService.createContact(contact));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Contact> getContactById(@PathVariable String id) {
        return ResponseEntity.ok(contactService.getContactById(id));
    }

    @GetMapping
    public ResponseEntity<Page<Contact>> getAllContacts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(contactService.getAllContacts(page, size));
    }

    @PostMapping("/photo")
    public ResponseEntity<String> uploadPhoto(@RequestParam("id") String id, @RequestParam("file") MultipartFile file) {
        return ResponseEntity.ok(contactService.uploadPhoto(id, file));
    }

    @GetMapping(path = "/image/{fileName}", produces = MediaType.IMAGE_PNG_VALUE)
    @SneakyThrows
    public byte[] getPhoto(@PathVariable("fileName") String fileName) {
        return Files.readAllBytes(Paths.get(Constants.PHOTO_DIRECTORY + fileName));
    }

}
