import { writable } from "svelte/store";

const meetups = writable([
  // {
  //   title: "Coding bootcamp",
  //   subtitle: "Learn to be a wizard, Harry!",
  //   address: "1234 Imaginary Road, Svelteland",
  //   imageUrl: "https://code.org/images/social-media/code-2018-creativity.png",
  //   description:
  //     "Our meetup welcomes you to learn all about the latest and coolest thing.",
  //   contactEmail: "code@test.com",
  // },
  // {
  //   title: "Bird watching",
  //   subtitle: "Look at all those Thichens!",
  //   address: "5678 Birb Road, Svelteland",
  //   imageUrl:
  //     "https://i.cbc.ca/1.4842389.1538143978!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_780/bird-watching-binoculars.jpg",
  //   description: "We watch all the birds. Dunno why but it's relaxing.",
  //   contactEmail: "code@test.com",
  // }
]);

const customMeetupsStore = {
  subscribe: meetups.subscribe,
  setMeetups: array => {
    meetups.set(array);
  },
  addMeetup: newMeetup => {
    meetups.update(items => [newMeetup, ...items]);
  },
  updateMeetup: (id, meetupData) => {
    meetups.update(items => {
      const meetupIndex = items.findIndex(i => i.id === id);
      const updatedMeetup = { ...items[meetupIndex], ...meetupData };
      const updatedMeetups = [...items];
      updatedMeetups[meetupIndex] = updatedMeetup;
      return updatedMeetups;
    });
  },
  removeMeetup: id => {
    meetups.update(items => {
      return items.filter(i => i.id !== id);
    });
  },
  toggleFavorite: id => {
    meetups.update(items => {
      const updatedMeetup = { ...items.find(m => m.id === id) };
      updatedMeetup.isFavorite = !updatedMeetup.isFavorite;
      const meetupIndex = items.findIndex(m => m.id === id);
      const updatedMeetups = [...items];
      updatedMeetups[meetupIndex] = updatedMeetup;
      return updatedMeetups;
    });
  }
};

export default customMeetupsStore;
