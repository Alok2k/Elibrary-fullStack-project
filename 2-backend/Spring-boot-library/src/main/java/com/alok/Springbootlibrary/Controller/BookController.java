package com.alok.Springbootlibrary.Controller;

import com.alok.Springbootlibrary.Srvice.BookService;
import com.alok.Springbootlibrary.entity.Book;
import com.alok.Springbootlibrary.utils.ExtractJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3001")
@RestController
@RequestMapping("/api/books")
public class BookController {

    @Autowired
    private BookService bookService;

    @PutMapping("/secure/checkout")
    public Book checkoutBook(@RequestHeader(value = "Authorization") String token ,@RequestParam Long bookId) throws Exception{
        String userEmail= ExtractJWT.payloadJWTExtraction(token);
        return bookService.checkoutBook(userEmail,bookId);
    }

    @GetMapping("/secure/isCheckout/byuser")
    public Boolean checkoutBookByUser(@RequestHeader(value = "Authorization") String token,@RequestParam Long bookId){
        String userEmail=ExtractJWT.payloadJWTExtraction(token);
        return bookService.checkoutBookByUser(userEmail,bookId);
    }

    @GetMapping("/secure/currentloans/count")
    public int currentLoansCount(@RequestHeader(value = "Authorization") String token){
        String userEmail=ExtractJWT.payloadJWTExtraction(token);
        return bookService.currentLoansCount(userEmail);

    }
}
