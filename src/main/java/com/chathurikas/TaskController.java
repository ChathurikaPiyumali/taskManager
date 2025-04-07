package com.chathurikas;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "*")
public class TaskController {

    @Autowired
    private TaskRepository repository;

    @GetMapping
    public List<Task> getAll() {
        return repository.findAll();
    }

    @PostMapping
    public Task create(@RequestBody Task task) {
        return repository.save(task);
    }

    @PutMapping("/{id}")
    public Task update(@PathVariable String id, @RequestBody Task task) {
        Task existing = repository.findById(id).orElseThrow();
        existing.setTitle(task.getTitle());
        existing.setDescription(task.getDescription());
        existing.setStatus(task.getStatus());
        return repository.save(existing);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        repository.deleteById(id);
    }
}
