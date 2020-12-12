import React from 'react';

function PostItem(props) {
  const {title, body} = props;

  return (
    <div>
      <p><b>{title}</b></p>
      <p>{body}</p>
    </div>
  );
}

export default PostItem;