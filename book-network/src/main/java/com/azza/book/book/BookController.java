package com.azza.book.book;

import com.azza.book.common.PageResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("books")
@RequiredArgsConstructor
@Tag(name ="Book")
public class BookController {
    private final BookService service;
    @PostMapping
    public ResponseEntity<Integer> saveBook(
            @Valid @RequestBody BookRequest request ,
            Authentication connectedUser
    ){
        return ResponseEntity.ok(service.save(request, connectedUser));
    }
    @GetMapping("{book-id}")
    public ResponseEntity<BookResponse> findBookById(
            @PathVariable("book-id") Integer bookId
    ) {
        return ResponseEntity.ok(service.findByID(bookId));
    }

    @GetMapping
    public ResponseEntity<PageResponse<BookResponse>> findAllBooks(
            @RequestParam(name="page", defaultValue="0", required= false) int page,
            @RequestParam(name="size", defaultValue="10", required= false) int size,
            Authentication connectedUser
            ) {
        return ResponseEntity.ok(service.findAllBooks(page, size, connectedUser));
    }
    @GetMapping("/owner")
    public ResponseEntity<PageResponse<BookResponse>> findAllBooksByOwner(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(service.findAllBooksByOwner(page, size, connectedUser));
    }
}
