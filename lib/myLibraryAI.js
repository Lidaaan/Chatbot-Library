import ollama from 'ollama'

const LibraryAi = {

  RetrieveError(){
    const message = `Envoie moi un message d'erreur en disant que tu n'as pas pu récupérer les informations demandés suite à une erreur (sans préciser l'erreur) en demandant à l'utilisateur de réiterer sa demande`

    return ollama.chat({
      model : "LibraryAI",
      messages : [{
        role : 'user',
        content : message
      }],
      // stream: true,
      options : {
        temperature : 0.4
      },
    })
  },

  transformAnswerForUser : async (inputUser, retrieveData)=>{
    const message = `Voici le prompt initial de l'utilisateur : "${inputUser}", la réponse à sa question est cela ${retrieveData} reformule la réponse pour que l'utilisateur comprenne correctement`

    return ollama.chat({
      model : "LibraryAI",
      messages : [{
        role : 'user',
        content : message
      }],
      // stream: true,
      options : {
        temperature : 0.2
      },
    })
  },

  getUserIntent : async (prompt)=>{
    console.log("here");
    
    const userPrompt = `Voici la demande de l'utilisateur n'hésite pas à la corriger il peut y avoir des fautes d'ortographe : "${prompt}" `
    const customPrompt = `Maintenant voici le schema de ma table Book dans ma bdd : 
    {
      "Titre": string,
      "Auteur": string,
      "Genre": string,
      "Annee": int,
      "Etage": int,
      "Section": string,
      "Exemplaires": int,
      "Statut": string
    }
    
    Voici une liste d'intentions spécifique que l'utilisateur serais susceptible d'avoir : 
    1 ) get_book_location
    2 ) get_number_of_pages_from_book_name
    3 ) get_book_genre
    4 ) get_number_of_chapter_from_book
    5) get_author_of_book
    6) get_year_of_book
    7) get_number_of_book_available
    
    Je veux que ta réponse soit uniquement le format JSON suivant, ta réponse ne doit pas être polluer par du texte quelconque.
    Renvoie moi l'intention ou les intentions de ce prompt sous ce format JSON suivant et uniquement sous ce format JSON (n'hésite pas à faire plusieurs objet json s'il y en a plusieurs) : 
    {
      "intent" : "une des intentions listés ci-dessus",
      "Titre ou Auteur ou Genre ou Annee ou Etage ou Section ou Exemplaires ou Statut" : "valeur",
      "rajoute des attribut s'il y en a" : "valeur"
    }
    `

    const message = userPrompt + customPrompt

    return ollama.chat({
      model : "LibraryAI",
      messages : [{
        role : 'user',
        content : message
      }],
      // stream: true,
      options : {
        temperature : 0.2
      },
    })

  },

  chat : async (message)=> {
    if(message){
      const response = await ollama.chat({
        model : "LibraryAI",
        messages : [{
          role : 'user',
          content : message
        }],
        options : {
          temperature : 0.6
        },
      }).then((res)=>{
        return res.message.content
      }).catch((err)=>{
        console.log(err);
      })

    }    
  }
}

export default LibraryAi