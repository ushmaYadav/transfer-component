import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      error: false, 
      errorInfo: null 
    };
  }

  static getDerivedStateFromError(error){
    return { error: true }
  }
  
  componentDidCatch(error, errorInfo) {
    this.setState({
      error: true,
      errorInfo: errorInfo
    })
  }
  
  render() {
    if (this.state.error) {
      return (
        <div>
          <h2>Something went wrong.</h2>
        </div>
      );
    }
    // Render children
    return this.props.children;
  }  
}

export default ErrorBoundary;

