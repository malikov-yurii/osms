package com.malikov.shopsystem.service;

import com.malikov.shopsystem.AuthorizedUser;
import com.malikov.shopsystem.model.User;
import com.malikov.shopsystem.repository.UserRepository;
import com.malikov.shopsystem.to.UserTo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;

import static com.malikov.shopsystem.util.UserUtil.prepareToSave;
import static com.malikov.shopsystem.util.UserUtil.updateFromTo;

@Service("userService")
public class UserServiceImpl implements UserService, UserDetailsService {

    @Autowired
    UserRepository repository;

    @Override
    public AuthorizedUser loadUserByUsername(String login) throws UsernameNotFoundException {
        User u = repository.getByLogin(login.toLowerCase());
        if (u == null) {
            throw new UsernameNotFoundException("User with login=" + login + " is not found");
        }
        return new AuthorizedUser(u);
    }

    @Override
    public User save(User user) {
        return repository.save(user);
    }

    @Override
    public User update(User user) {
        return repository.save(user);
    }

//    @CacheEvict(value = "users", allEntries = true)
    @Transactional
    @Override
    public void update(UserTo userTo) {
        User user = updateFromTo(get(userTo.getId()), userTo);
        repository.save(prepareToSave(user));
    }

    @Override
    public User get(int id) {
        return repository.get(id);
    }

    @Override
    public Collection<User> getAll() {
        return repository.getAll();
    }

    @Override
    public void delete(int id) {
        repository.delete(id);
    }

    @Override
    public User getByLogin(String login) {
        return repository.getByLogin(login);
    }
}
