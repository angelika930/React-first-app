//import React, {useState} from "react";
import React, {useState, useEffect} from 'react';
import Table from "./Table";
import Form from './Form';

function MyApp() {
	const [characters, setCharacters] = useState([]);
	function deleteUser() {
		const promise = fetch("http://localhost:10000/users/:id", {
			method: "DELETE",
			headers: {
			  "Content-Type": "application/json",
			  
			},
		  });
		  
		  return promise;


	}
	function removeOneCharacter (index) {
		deleteUser()
		.then((res) => {
			if (res.status === 204) {
				const updated = characters.filter((character,i) => {
					return i !== index
				});
				setCharacters(updated);
			}
			else {
				console.error("Failed to user on the backend.");
			}
		
		})
		.catch((error) => {
			console.log(error);
		});
	}
	
	

	function fetchUsers() {
		const promise = fetch("http://localhost:10000/users");
		return promise;
	}
	function postUser(person) {
		const promise = fetch("http://localhost:10000/users", {
		  method: "POST",
		  headers: {
			"Content-Type": "application/json",
			
		  },
		  body: JSON.stringify(person),
		});
		
		return promise;
	  }
	function updateList(person) { 
		postUser(person)
			.then((res) => {
				console.log(res);
				return res.status === 201 ? res.json() : undefined
		  	})
			.then((json) => {if (json) setCharacters([...characters, person])})
		  	.catch((error) => {
			console.log(error);
		  	});
	}
	useEffect(() => {
		fetchUsers()
			.then((res) => res.json())
			.then((json) => setCharacters(json["users_list"]))
			.catch((error) => { console.log(error); });
	  }, [] );
  return (
    <div className = "container">
        <Table characterData={characters}
	  	removeCharacter={removeOneCharacter} />
	<Form handleSubmit={updateList} />
    </div>
  );
}
export default MyApp;
