import React from 'react';

// אם משהו נשבר, במקום מסך ריק מוצגת הודעה וכפתור התחלה מחדש (חשוב בטוטם שאין בו מקלדת).
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error('Game error:', error, info && info.componentStack);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="screen center-screen">
          <h1 className="title">אירעה תקלה</h1>
          <p className="lead">המשחק יתחיל מחדש.</p>
          <button
            className="btn btn-primary"
            onClick={() => {
              this.setState({ error: null });
              if (this.props.onReset) this.props.onReset();
            }}
          >
            התחלה מחדש
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
