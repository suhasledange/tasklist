export const formatTime = (time) => {
    const date = new Date(`1970-01-01T${time}`);
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    };
    return date.toLocaleString('en-US', options);
  };