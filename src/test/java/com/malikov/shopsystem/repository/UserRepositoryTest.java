package com.malikov.shopsystem.repository;

import org.junit.Test;

public class UserRepositoryTest extends AbstractRepositoryTest {

    //@Autowired
    //private UserRepository userRepository;

    @Test
    public void testSave() throws Exception {
        /*
        User newUser = new User(100000L, "newUserNamer", "newPassword", ROLE_USER);
        User created = userRepository.save(newUser);
        assertEquals(
                Arrays.asList(ADMIN, created, USER),
                userRepository.findAll(new PageRequest(0, 100)));
*/

        System.out.println("ok");
    }
/*
    @Test
    public void testUpdate() throws Exception {
        User updated = new User(USER);
        updated.setName("User_Updated");
        userRepository.update(updated);
        assertEquals(updated, userRepository.get(USER.getCustomerId()));
    }

    @Test
    public void testGet() throws Exception {
        User user = userRepository.get(ADMIN.getCustomerId());
        assertEquals(ADMIN, user);
    }

    @Test
    public void testGetByName() throws Exception {
        User admin = userRepository.getByLogin(ADMIN.getName());
        assertEquals(ADMIN, admin);
    }

    @Test
    public void testGetAll() throws Exception {
        Collection<User> all = userRepository.getAll();
        assertCollectionEquals(Arrays.asList(ADMIN, USER), all);
    }

    @Test
    public void testDelete() throws Exception {
        userRepository.delete(USER.getCustomerId());
        assertEquals(Collections.singletonList(ADMIN), userRepository.getAll());
    }*/
}