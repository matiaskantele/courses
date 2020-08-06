import React, { Component } from 'react';

import Image from '../../../components/Image/Image';
import './SinglePost.css';

class SinglePost extends Component {
  state = {
    title: '',
    author: '',
    date: '',
    image: '',
    content: ''
  };

  componentDidMount() {
    // eslint-disable-next-line
    const postId = this.props.match.params.postId;
    const query = {
      query: `query FetchSinglePost($postId: ID!) {
        post(id: $postId) {
          title
          content
          imageUrl
          creator {
            name
          }
          createdAt
        }
      }`,
      variables: {
        postId: postId,
      }
    }
    fetch(`${process.env.REACT_APP_BACKEND_URL}/graphql`, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + this.props.token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(query),
    })
      .then(res => {
        return res.json();
      })
      .then(resData => {
        if (resData.errors) {
          throw new Error('Fetching post failed.')
        }
        this.setState({
          title: resData.data.post.title,
          image: `${process.env.REACT_APP_BACKEND_URL}/${resData.data.post.imageUrl}`,
          author: resData.data.post.creator.name,
          date: new Date(resData.data.post.createdAt).toLocaleDateString('en-US'),
          content: resData.data.post.content
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <section className="single-post">
        <h1>{this.state.title}</h1>
        <h2>
          Created by {this.state.author} on {this.state.date}
        </h2>
        <div className="single-post__image">
          <Image contain imageUrl={this.state.image} />
        </div>
        <p>{this.state.content}</p>
      </section>
    );
  }
}

export default SinglePost;
