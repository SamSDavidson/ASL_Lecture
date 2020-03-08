const uuid = require('uuid/v1');
//require decisions for example data
const decisions = require('./decisions');
const options = require('./options');

class Model{
    constructor(data){
        this.values = data;
    }
    //pass data to be added
    create(item){
        //create uuid
        const id = uuid();
        //add item data and id to array of values
        this.values.push({id, ...item});

        //return new id
        return id;
    }
    findByPk(id){
        //find function of an array searches for the first item = true
        return this.values.find(item=> item.id === id);
    }
    findAll(){
        return this.values;
    }
    //take in new valeus and the ID of the item 
    update(valuesToChange, id){
        //index to change
        const index = this.values.findIndex(item=> item.id === id);

        //take current and update
        const newValue = {...this.values[index], ...valuesToChange};

        //piece together the array
        this.values =[
            ...this.values.slice(0, index),
            newValue,
            ...this.values.slice(index + 1),
        ];

        //return new item
        return newValue;
    }
    destroy(id){
        //set the values object to an array of items that don't have the passed in id
        this.values = this.values.filter((item)=>{
            if(item.id === id) return false;
            return true;
        });
    }
}

module.exports = {
    Decisions: new Model(decisions),
    Options: new Model(options),
};