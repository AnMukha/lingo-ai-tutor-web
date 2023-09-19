import React, { useEffect, useRef } from 'react';
import { useNavigate  } from 'react-router-dom';
import './VocabularyOverview.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../Store/store';
import { WordPoint, fetchWordMapPoints } from '../../Store/VocabularyMapSlice';

const VocabularyOverview = () => {

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const dispatch = useDispatch<AppDispatch>();
    const { points, loading, error } = useSelector((state: RootState) => state.wordPoints);
  
    useEffect(() => {
      dispatch(fetchWordMapPoints());
    }, [dispatch]);
    
    useEffect(() => {
        const resizeCanvas = () => {
            paint(points);
        };        
        resizeCanvas();        
        window.addEventListener('resize', resizeCanvas);        
        return () => {
            window.removeEventListener('resize', resizeCanvas);
        }
    }, [points]);

    const paint = (points: WordPoint[]) =>
    {
        const canvas = canvasRef.current;
        if (points.length > 0 && canvas) {
          canvas.width = canvas.clientWidth;
          canvas.height = canvas.clientHeight;  
          const ctx = canvas.getContext('2d');
          if (ctx) {
  
              ctx.clearRect(0, 0, canvas.width, canvas.height);
      
              const xSpace = 30;
              const ySpace = 50;
  
              const xScale = canvas.width / (1920 + xSpace);
              const yScale = canvas.height / (1080 + ySpace);
                      
              ctx.setTransform(xScale, 0, 0, yScale, 0, 0);
  
            points.forEach(point => {
              ctx.beginPath();
              ctx.arc(xSpace/2 + point.x, ySpace/2 + point.y, 2, 0, 2 * Math.PI, false);
              ctx.fillStyle = "silver";
              ctx.fill();
            });
          }
        }
  
    }
  
    const navigate = useNavigate();

    const onHomeClick = () => {
        navigate('/');
    };

    return (
        <div className="container">
            <div className="topBar">
                <button onClick={onHomeClick}>
                    Home
                </button>
            </div>
            <div className="canvasContainer">
                <canvas ref={canvasRef} className="canvas"></canvas>
            </div>
        </div>
    );
}

export default VocabularyOverview;