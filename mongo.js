const mongoose = require('mongoose');

if (process.argv.length === 3) {
    // If only one argument is provided, list all persons and exit
    const password = process.argv[2];
    const url = `mongodb+srv://hamzasafdark:${password}@cluster00.98xzu9j.mongodb.net/person-app?retryWrites=true&w=majority`;

    mongoose.connect(url);

    const personSchema = new mongoose.Schema({
        id: Number,
        name: String,
        number: String,
    });

    const Person = mongoose.model('Person', personSchema);

    Person.find({}).then((result) => {
        console.log(`phonebook:`)
        result.forEach((person) => {
            console.log(person.name, " ", person.number)
        });
        mongoose.connection.close();
        process.exit(0);
    }).catch((error) => {
        console.error('Error:', error);
        mongoose.connection.close();
        process.exit(1);
    });
} else if (process.argv.length === 5) {
    // If four arguments are provided, add a new person
    const password = process.argv[2];
    const name = process.argv[3];
    const number = process.argv[4];

    const url = `mongodb+srv://hamzasafdark:${password}@cluster00.98xzu9j.mongodb.net/person-app?retryWrites=true&w=majority`;

    mongoose.connect(url);

    const personSchema = new mongoose.Schema({
        id: Number,
        name: String,
        number: String,
    });

    const Person = mongoose.model('Person', personSchema);

    Person.find({}).sort({ id: -1 }).limit(1).then((result) => {
        const latestId = result.length > 0 ? result[0].id : 0;
        const newId = latestId + 1;

        const person = new Person({
            id: newId,
            name: name,
            number: number,
        });

        person.save().then((result) => {
            console.log(`added ${name} ${number} to phonebook`);
            mongoose.connection.close();
            process.exit(0);
        }).catch((error) => {
            console.error('Error:', error);
            mongoose.connection.close();
            process.exit(1);
        });
    }).catch((error) => {
        console.error('Error:', error);
        mongoose.connection.close();
        process.exit(1);
    });
}


