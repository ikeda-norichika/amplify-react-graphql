import { useState, useEffect } from "react";
import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import {
  Button,
  Flex,
  Heading,
  Text,
  TextField,
  Image,
  View,
  Authenticator,
} from "@aws-amplify/ui-react";
import { listNotes } from "../ui-components/graphql/queries";
import {
  createNote as createNoteMutation,
  deleteNote as deleteNoteMutation,
} from "../ui-components/graphql/mutations";
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
import { list, remove, uploadData } from 'aws-amplify/storage';
import { generateClient } from "aws-amplify/api";



Amplify.configure(awsExports);

const client = generateClient();

const App = ({ signOut }: {signOut: any}) => {

  type Note = {
    id: number,
    name: string,
    description: string,
    image: string
  }

  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    fetchNotes();
  }, []);



  async function fetchNotes() {
    const apiData: any = await client.graphql({ query: listNotes });
    const notesFromAPI = apiData.data.listNotes.items;
    await Promise.all(
      notesFromAPI.map(async (notes: any) => {
        if (notes.image) {
          const url = await list(notes.name);
          notes.image = url;  
        }
        return notes;
      })
    );
    setNotes(notesFromAPI);
  }
 

  async function createNote(event: any) {
    event.preventDefault();
    const form = new FormData(event.target);
    const image: any = form.get("image");
    const data = {
      name: form.get("name"),
      description: form.get("description"),
      image: image.name,
    };
    console.log(data.image);
    if (!!data.image) uploadData({
      key: data.name as string,
      data: image
    });
    await client.graphql({
      query: createNoteMutation,
      variables: { input: data },
    });
    fetchNotes();
    event.target.reset();
  }
  
  async function deleteNote({ id, name }: {id: number; name: string}) {
    const newNotes = notes.filter((notes) => notes.id !== id);
    setNotes(newNotes);
    await remove({ path:name });
    await client.graphql({
      query: deleteNoteMutation,
      variables: { input: { id } },
    });
  }  

  console.log(notes);

  return (
    <Authenticator>
      <View className="App">
        <Heading level={1}>My Notes App</Heading>
        <View as="form" margin="3rem 0" onSubmit={createNote}>
          <Flex direction="row" justifyContent="center">
            <TextField
              name="name"
              placeholder="Note Name"
              label="Note Name"
              labelHidden
              variation="quiet"
              required
            />
            <TextField
              name="description"
              placeholder="Note Description"
              label="Note Description"
              labelHidden
              variation="quiet"
              required
            />
            <View
              name="image"
              as="input"
              type="file"
              style={{ alignSelf: "end" }}
            />
            <Button type="submit" variation="primary">
              Create Note
            </Button>
          </Flex>
        </View>
        <Heading level={2}>Current Notes</Heading>
        <View margin="3rem 0">
        {notes.map((note) => (
          <Flex
            key={note.id || note.name}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Text as="strong" fontWeight={700}>
              {note.name}
            </Text>
            <Text as="span">{note.description}</Text>
            {note.image && (
              <Image
                src={note.image}
                alt={`visual aid for ${note.name}`}
                style={{ width: 400 }}
              />
            )}
            <Button variation="link" onClick={() => deleteNote(note)}>
              Delete note
            </Button>
          </Flex>
          ))}
        </View>
        <Button onClick={signOut}>Sign Out</Button>
      </View>
    </Authenticator>
  );
};

export default App;