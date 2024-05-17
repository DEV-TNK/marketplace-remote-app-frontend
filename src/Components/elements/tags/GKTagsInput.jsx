import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactTagInput from '@pathofdev/react-tag-input';

const GKTagsInput = ({ defaultTags, onAddTag, onRemoveTag }) => {
  const [tags, setTags] = useState([]);

  // Update tags when defaultTags changes
  useEffect(() => {
    // Extracting names from defaultTags and setting as initial tags
    setTags(defaultTags.map(tag => ({ name: tag.name })));
  }, [defaultTags]);

  const handleTagChange = (newTags) => {
    // Update state
    setTags(newTags.map(tag => ({ name: tag }))); // Ensure tags are objects with 'name' property

    // Call callbacks
    newTags.forEach(tag => {
      const existingTag = defaultTags.find(t => t.name === tag);
      if (!existingTag) {
        onAddTag({ name: tag }); // Pass the tag in the correct format
      }
    });

    defaultTags.forEach(tag => {
      if (!newTags.includes(tag.name)) {
        onRemoveTag(tag);
      }
    });
  };

  return (
    <ReactTagInput
      tags={tags.map(tag => tag.name)}
      onChange={handleTagChange}
    />
  );
};

GKTagsInput.propTypes = {
  defaultTags: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string })), // Change the propType to an array of objects with 'name' property
  onAddTag: PropTypes.func.isRequired,
  onRemoveTag: PropTypes.func.isRequired,
};

GKTagsInput.defaultProps = {
  defaultTags: [],
};

export default GKTagsInput;
