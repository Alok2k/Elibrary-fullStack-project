package com.alok.Springbootlibrary.entity;

import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "checkout")
@Data
@RequiredArgsConstructor



public class Checkout {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;
    @Column(name="book_id")
    private Long bookId;
    @Column(name="user_email")
    private  String userEmail;
    @Column(name="checkout_date")
    private String checkoutDate;
    @Column(name="return_date")
    private String returnDate;

    public Checkout(String userEmail, String checkoutDate, String returnDate, Long bookId) {
        this.userEmail = userEmail;
        this.checkoutDate = checkoutDate;
        this.returnDate = returnDate;
        this.bookId = bookId;
    }
}
