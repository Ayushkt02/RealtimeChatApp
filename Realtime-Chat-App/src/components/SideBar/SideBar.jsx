import React, { useState, useEffect } from "react";
import { UserInfo } from "../UserInfo/UserInfo";
import firebase from "../../server/firebase.js";


const SideBar = (props) => {
  const [showForm, setShowForm] = useState(false);
  const [channelAddState, setChannelAddState] = useState({
    name: "",
    description: "",
  });
  const [channelsState, setChannelsState] = useState([]);
  const channelsRef = firebase.database().ref("channels");

  useEffect(() => {
    channelsRef.on("child_added", (snap) => {
      setChannelsState((currentState) => {
        let Updatedstate = [...currentState];
        Updatedstate.push(snap.val());
        return Updatedstate;
      });
    });
  }, []);

  const handleButtonClick = () => {
    setShowForm(!showForm);
  };

  const handleInput = (event) => {
    let target = event.target;
    setChannelAddState((currentState) => {
      let Updatedstate = { ...currentState };
      Updatedstate[target.name] = target.value;
      return Updatedstate;
    });
  };

  const checkForm = () => {
    return (
      channelAddState && channelAddState.name && channelAddState.description
    );
  };

  const displayChannels = () => {
    if (channelsState.length > 0) {
       return channelsState.map((channel) => {
        console.log(channel);
        return <a
          className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-50 hover:text-gray-700"
          key={channel.id}
          name={channel.name}
        >
          <span className="mx-2 text-sm font-medium">{channel.name}</span>
        </a>;
      });
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (!checkForm) {
      return;
    }

    const key = channelsRef.push().key;
    const channel = {
      id: key,
      name: channelAddState.name,
      description: channelAddState.description,
      created_by: {
        name: props.name.name.multiFactor.user.displayName,
        avatar: props.name.name.multiFactor.user.photoURL,
      },
    };
    channelsRef
      .child(key)
      .update(channel)
      .then(() => {
        setChannelAddState({ name: "", description: "" });
        handleButtonClick();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {});
  };
  return (
    <aside className="flex h-screen w-64 flex-col overflow-y-auto border-r bg-black px-5 py-8">
      <a href="#">
        {/* <img src={props.name.name.multiFactor.user.photoURL} alt="Avatar" className='h-40 w-46'/> */}
        <UserInfo name={props} />
      </a>
      <div className="mt-6 flex flex-1 flex-col justify-between">
        <nav className="-mx-3 space-y-6 ">
          <div className="space-y-3 ">
            <div className="flex justify-between items-center">
              <label className="px-3 text-lg font-semibold uppercase text-white">
                Channels({channelsState.length})
              </label>

              <div>
                <a
                  className="text-lg rounded-lg px-3 text-gray-200 transition-colors duration-300 hover:bg-gray-50 hover:text-gray-700 hover: cursor-pointer"
                  onClick={handleButtonClick}
                >
                  <span>ADD +</span>
                </a>
              </div>
            </div>
            <div className="bg-gray-600 rounded-lg transition-all duration-300">
              {showForm && (
                <form
                  onSubmit={onSubmit}
                  className="flex-col space-y-4 transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-30"
                >
                  <h3>Create New Channel</h3>
                  <input
                    type="text"
                    name="name"
                    value={channelAddState.name}
                    onChange={handleInput}
                    placeholder="Channel Name"
                    className=" rounded-lg text-black px-3 py-1"
                  />
                  <textarea
                    type="text"
                    name="description"
                    value={channelAddState.description}
                    onChange={handleInput}
                    placeholder="Channel Description"
                    className="rounded-lg text-black px-3"
                  />
                  <button
                    type="submit"
                    className="rounded-lg w-full py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-50 hover:text-gray-700"
                    onClick={onSubmit}
                  >
                    Create
                  </button>
                </form>
              )}
            </div>
            {displayChannels()}
          </div>
          <div className="space-y-3 ">
            <label className="px-3 text-xs font-semibold uppercase text-white">
              content
            </label>
            <a
              className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              href="#"
            >
              <span className="mx-2 text-sm font-medium">Blogs</span>
            </a>
            <a
              className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              href="#"
            >
              <span className="mx-2 text-sm font-medium">Notifications</span>
            </a>
            <a
              className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              href="#"
            >
              <span className="mx-2 text-sm font-medium">Checklists</span>
            </a>
          </div>

          <div className="space-y-3 ">
            <label className="px-3 text-xs font-semibold uppercase text-white">
              Customization
            </label>
            <a
              className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              href="#"
            >
              <span className="mx-2 text-sm font-medium">Themes</span>
            </a>
            <a
              className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              href="#"
            >
              <span className="mx-2 text-sm font-medium">Setting</span>
            </a>
          </div>

          <div className="space-y-3 ">
            <button
              onClick={logout}
              className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-gray-700"
            >
              Logout
            </button>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default SideBar;
