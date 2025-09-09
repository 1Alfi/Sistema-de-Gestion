package com.sistema_contable.sistema.contable.model;

import jakarta.persistence.*;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "entrys")
public class Entry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_entry")
    private Long id;

    @Column(name = "entry_description")
    private String description;

    @Column(name = "date_created")
    private Date dateCreated;

    @ManyToOne
    @JoinColumn(name = "entry_user_creator_id")
    private User userCreator;

    @OneToMany(mappedBy = "entry_id", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Movement> lines;


    //id
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    //description
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }

    //date created
    public Date getDateCreated() {
        return dateCreated;
    }
    public void setDateCreated(Date dateCreated) {
        this.dateCreated = dateCreated;
    }

    //user creator
    public User getUserCreator() {
        return userCreator;
    }
    public void setUserCreator(User userCreator) {
        this.userCreator = userCreator;
    }

    //lines
    public List<Movement> getMovement() {
        return lines;
    }
    public void setLines(List<Movement> movement) {
        if(doubleEntryCheck(movement)){return;}
        this.lines = movement;
    }

    private boolean doubleEntryCheck(List<Movement> movements){
        Double debit = 0D;
        Double credit = 0D;
        for(Movement movement : movements){
            debit += movement.getDebit();
            credit += movement.getCredit();
        }
        if(debit-credit != 0){return false;}
        else {return true;}
    }
}
