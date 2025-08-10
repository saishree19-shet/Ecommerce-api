
const express = require('express');
app.use(cors());


const app = express();
app.use(bodyParser.json());



const pets = [
  { id: 1, name: "Bella", type: "Dog", image: "bella.jpg" },
  { id: 2, name: "Charlie", type: "Dog", image: "charlie.jpg" },
  { id: 3, name: "Max", type: "Dog", image: "max.jpg" },
  { id: 4, name: "Lucy", type: "Dog", image: "lucy.jpg" },
  { id: 5, name: "Daisy", type: "Dog", image: "daisy.jpg" },
  { id: 6, name: "Rocky", type: "Dog", image: "rocky.jpg" },
  { id: 7, name: "Luna", type: "Dog", image: "luna.jpg" },
  { id: 8, name: "Cooper", type: "Dog", image: "cooper.jpg" },
  { id: 9, name: "Bailey", type: "Dog", image: "bailey.jpg" }
];
const petDetails = {
  1: { id: 1, name: "Bella", type: "Dog", age: 2, breed: "Golden Retriever", fun_fact: "Golden Retrievers love swimming!", image: "bella.jpg" },
  2: { id: 2, name: "Charlie", type: "Dog", age: 3, breed: "Beagle", fun_fact: "Beagles have a great sense of smell!", image: "charlie.jpg" },
  3: { id: 3, name: "Max", type: "Dog", age: 1, breed: "German Shepherd", fun_fact: "German Shepherds are excellent guard dogs!", image: "max.jpg" },
  4: { id: 4, name: "Lucy", type: "Dog", age: 4, breed: "Bulldog", fun_fact: "Bulldogs are gentle and affectionate!", image: "lucy.jpg" },
  5: { id: 5, name: "Daisy", type: "Dog", age: 2, breed: "Poodle", fun_fact: "Poodles are highly intelligent and easy to train!", image: "daisy.jpg" },
  6: { id: 6, name: "Rocky", type: "Dog", age: 5, breed: "Rottweiler", fun_fact: "Rottweilers are loyal and protective!", image: "rocky.jpg" },
  7: { id: 7, name: "Luna", type: "Dog", age: 1, breed: "Husky", fun_fact: "Huskies love to run and pull sleds!", image: "luna.jpg" },
  8: { id: 8, name: "Cooper", type: "Dog", age: 3, breed: "Boxer", fun_fact: "Boxers are playful and full of energy!", image: "cooper.jpg" },
  9: { id: 9, name: "Bailey", type: "Dog", age: 2, breed: "Shih Tzu", fun_fact: "Shih Tzus are friendly lap dogs!", image: "bailey.jpg" }
};
app.get('/pets', (req, res) => {
  res.json(pets);
});
app.get('/pets/:id', (req, res) => {
  const petId = parseInt(req.params.id);
  const pet = petDetails[petId];
  if (!pet) {
    return res.status(404).json({ message: "Pet not found" });
  }
  res.json(pet);
});
app.post('/adopt', (req, res) => {
  const { pet_id, applicant_name, email, reason } = req.body;

  if (!applicant_name || !email || !reason) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const adoptionId = Math.floor(Math.random() * 9000) + 1000;

  res.json({
    adoption_id: adoptionId,
    status: "pending_review",
    message: "Your adoption request has been received!"
  });
});
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

