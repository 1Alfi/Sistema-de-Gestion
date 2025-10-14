package com.sistema_contable.sistema.contable.model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@DiscriminatorValue("control")
public class ControlAccount extends Account{


    @OneToMany(mappedBy = "control_account_id",fetch = FetchType.EAGER ,cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Account> subAccounts = new ArrayList<>();

    //methods
    //children
    public List<Account> getChildAccounts() {return subAccounts;}
    public void setChildAccounts(List<Account> childAccounts) {this.subAccounts = childAccounts;}

    //add children
    public void addChildren(Account children){
        //set variables to do the code more readable
        String ownCode = this.getCode();
        List<Account> childAccounts = this.getChildAccounts();
        Account father = this.getControl_account_id();
        //formats the code
        if(childAccounts.isEmpty()){
            if(father == null){
                this.setCode(ownCode+".00");}
            else{
                if(!brotherHaveChilds()){
                    this.setCode(ownCode+".00");
                    this.refreshCode();}}}
        //set the children
        this.setChildrenCode(children);
        children.setControl_account_id(this);
        this.getChildAccounts().add(children);}

    //delete children
    public void deleteChildren(Account children){
        this.getSubAccounts().remove(children);}

    //abstract methods
    @Override
    public String getType() {
        return "Control";
    }

    @Override
    public List<Account> getSubAccounts(){
        return this.getChildAccounts();}

    //secondary methods
    private boolean brotherHaveChilds(){
        for (Account brother : this.getControl_account_id().getSubAccounts()){
            if( !brother.getCode().equals(this.getCode()) && !brother.getSubAccounts().isEmpty()){
                return true;}}
        return false;}

    private void refreshCode(){
        Account father = this.getControl_account_id();
        do{
            father.setCode(father.getCode()+".00");
            for (Account brother : father.getSubAccounts()){
                if(brother.getCode().length()!=this.getCode().length()){
                    brother.setCode(brother.getCode()+".00");}

                if(!brother.getSubAccounts().isEmpty()){
                    for (Account child : brother.getSubAccounts()){
                        if(child.getCode().length()!=this.getCode().length()){
                            child.setCode(child.getCode()+".00");}}}}

            father = father.getControl_account_id();
        }while (father != null);}


    private void setChildrenCode(Account children){
        String code = this.getCode();
        String childrenCode = "";
        int childrenNumber = this.getChildAccounts().size()+1;

        for (int i = 1; i < code.length(); i++) {
            //when the position of the children is in the last level
            if (code.charAt(i-1)=='0' && code.charAt(i)=='0'){
                if (childrenNumber >= 10) {
                    childrenCode = code.substring(0,i-1)+"."+childrenNumber;}
                else{
                    childrenCode = code.substring(0,i-1)+"0"+childrenNumber;}
                break;}
            //when the children are in the middle of the levels
            if (this.getCode().charAt(i)=='0' && this.getCode().charAt(i+1) == '.'){
                childrenCode = code.substring(0,i-2)+childrenNumber;
            break;}}
        //format the code of the childrens
        for (Account childrenAUX :  this.getSubAccounts()){
            if (code.length()>childrenAUX.getCode().length()){
                childrenAUX.setCode(childrenAUX.getCode()+".00");}}
        //set the finals digit of the code
        if (code.length()>childrenCode.length()){
            childrenCode = childrenCode + code.substring(childrenCode.length());}
        children.setCode(childrenCode);}


}