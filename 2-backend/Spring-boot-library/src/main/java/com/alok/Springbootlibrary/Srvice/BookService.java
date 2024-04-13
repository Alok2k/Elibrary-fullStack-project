package com.alok.Springbootlibrary.Srvice;

import com.alok.Springbootlibrary.DAO.BookRepository;
import com.alok.Springbootlibrary.DAO.CheckoutRepository;
import com.alok.Springbootlibrary.entity.Book;
import com.alok.Springbootlibrary.entity.Checkout;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Optional;

@Service
@Transactional
public class BookService {

    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private CheckoutRepository checkoutRepository;

    public Book checkoutBook(String userEmail, Long bookId ) throws Exception{
        Optional<Book> book=bookRepository.findById(bookId);
        Checkout validateCheckout=checkoutRepository.findByUserEmailAndBookId(userEmail, bookId);
        // we want user to checkout 1 book at same time
        if (!book.isPresent()|| validateCheckout!=null|| book.get().getCopiesAvailable()<=0){
            throw new Exception("Book doesnt exist or already checkedout");
        }
        book.get().setCopiesAvailable(book.get().getCopiesAvailable()-1);
        bookRepository.save(book.get());

        Checkout checkout=new Checkout(userEmail,
                LocalDate.now().toString(),
                LocalDate.now().plusDays(7).toString(),
                book.get().getId()
                );
        checkoutRepository.save(checkout);
        return book.get();

    }

    public boolean checkoutBookByUser(String userEmail, Long bookId){
        Checkout validateCheckout=checkoutRepository.findByUserEmailAndBookId(userEmail,bookId);
        if (validateCheckout!=null){
            return true;
        }else {
            return false;
        }
    }

    public int currentLoansCount(String userEmail){
        return checkoutRepository.findBooksByUserEmail(userEmail).size();

    }
}
