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

    @OneToMany(mappedBy = "entry", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Movement> movements;


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

    //movements
    public List<Movement> getMovements() {return movements;}
    public void setMovements(List<Movement> movements){
        if(!movements.isEmpty() && doubleEntryCheck(movements)){
            this.movements = movements;
        }
        return;
    }

    //check method
    private boolean doubleEntryCheck(List<Movement> movements){ //Hace el check del principio de partida doble
        Double debit = 0D;
        Double credit = 0D;
        for(Movement movement : movements){
            debit += movement.getDebit();
            credit += movement.getCredit();
        }
        return debit - credit == 0;
    }
}
