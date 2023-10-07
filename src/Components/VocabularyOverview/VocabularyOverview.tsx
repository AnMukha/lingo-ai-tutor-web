import React, { useEffect, useRef, useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import './VocabularyOverview.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../Store/store';
import { WordPoint, fetchWordMapPoints } from '../../Store/VocabularyMapSlice';

const VocabularyOverview = () => {
    
    const [selectedWord, setSelectedWord] = useState<WordPoint | null>(null);

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
      
              const xSpace = 0; //30;
              const ySpace = 0; //50;
  
              const xScale = canvas.width / (1920 + xSpace);
              const yScale = canvas.height / (1080 + ySpace);
                      
              //ctx.setTransform(xScale, 0, 0, yScale, 0, 0);
  
            points.forEach(point => {
              ctx.beginPath();
              ctx.arc(xSpace/2 + point.x, ySpace/2 + point.y, 2, 0, 2 * Math.PI, false);
              if (point.correctUses + point.nonUses == 0 )
              {
                ctx.fillStyle = "darkgray";
              }
              else if (point.correctUses == 0 && point.nonUses != 0)
              {
                ctx.fillStyle = "red";
              }
              else if (point.correctUses > point.nonUses)
              {
                ctx.fillStyle = "green";
              }
              else
                ctx.fillStyle = "orange";

              ctx.fill();
            });
          }
        }
  
    }

    const Tooltip: React.FC<WordPoint> = ({ x, y, wrd, correctUses, nonUses }) => {
        const style: React.CSSProperties = {
          position: 'absolute',
          top: y,
          left: x,
          backgroundColor: 'white',
          border: '1px solid black',
          padding: '5px',
          zIndex: 10, 
          pointerEvents: 'none' 
        };
        return (
          <div style={style}>
            <p>Word: {wrd}</p>
            <p>Used correctly: {correctUses}</p> 
            <p>Not used: {nonUses}</p> 
          </div>
          );
      };  
      
    const navigate = useNavigate();

    const onHomeClick = () => {
        navigate('/');
    };    

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement> ) => {
        const canvas = e.target as HTMLCanvasElement;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
    
        const word = points.find(p => Math.sqrt((x-p.x)*(x-p.x) + (y-p.y)*(y-p.y))<=3);
        if (word) setSelectedWord(word);                    
        else setSelectedWord(null);
      };

    return (
        <div className="container">
            <div className="topBar">
                <button onClick={onHomeClick}>
                    Home
                </button>
            </div>
            <div className="canvasContainer">
                <canvas ref={canvasRef} className="canvas" onMouseMove={handleMouseMove}></canvas>
            </div>
            {selectedWord && <Tooltip wrd={selectedWord.wrd} x={selectedWord.x} y={selectedWord.y} correctUses={selectedWord?.correctUses} nonUses={selectedWord?.nonUses}/>}
        </div>
    );
}

export default VocabularyOverview;