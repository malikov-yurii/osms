package com.malikov.shopsystem.repository;

public abstract class UserRepositoryTest extends AbstractRepositoryTest {

    /*@Autowired
    protected UserService service;

    @Test
    public void testSave() throws Exception {
        User newUser = new User("newUserNamer", "newPassword", ROLE_USER);
        User created = service.create(newUser);
        MATCHER.assertCollectionEquals(
                Arrays.asList(ADMIN, created, USER),
                service.getAll());
    }

    @Test
    public void testUpdate() throws Exception {
        User updated = new User(USER);
        updated.setName("User_Updated");
        service.update(updated);
        MATCHER.assertEquals(updated, service.get(USER.getId()));
    }

    @Test
    public void testGet() throws Exception {
        User user = service.get(ADMIN.getId());
        MATCHER.assertEquals(ADMIN, user);
    }

    @Test
    public void testGetByName() throws Exception {
        User admin = service.getByLogin(ADMIN.getName());
        MATCHER.assertEquals(ADMIN, admin);
    }

    @Test
    public void testGetAll() throws Exception {
        Collection<User> all = service.getAll();
        MATCHER.assertCollectionEquals(Arrays.asList(ADMIN, USER), all);
    }

    @Test
    public void testDelete() throws Exception {
        service.delete(USER.getId());
        MATCHER.assertCollectionEquals(Collections.singletonList(ADMIN), service.getAll());
    }*/
}