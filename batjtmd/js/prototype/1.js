var Person = {
    name: 'John',
    age: 30,
    greet: function() {
      console.log('Hello, my name is ' + this.name + ' and I am ' + this.age + ' years old.');
    }
  };

  Person.greet();