var Sandman = {
  context: null,
  gesture: null,
  gestPtr: null,
  keyPoints: [],
domElements:null,
  scrollX:0,
  scrollY:0,
  isTouchDevice:0,
  drawDiv: null,
  currentGesture: [],
  imageData: null,
  drawRatioX: document.body.scrollLeft,
  drawRatioY:document.body.scrollTop,
  currentParameters: [],
  gestures: [],
  domElement: null,
  set: null,
  //No. of points to represent each  gesture
  samplePoints: 32,
  gestureArray: [


                                        {name:"nxtSlide",points:[[530.0992915779111, -559.6913632701503], [17, -13], [17, -8], [17, -3], [16, 1], [16, 6], [15, 10], [14, 15], [13, 19], [13, 24], [13, 29], [12, 33], [12, 38], [12, 42], [12, 47], [-20, 15], [-15, 15], [-11, 15], [-6, 15], [-1, 16], [3, 16], [8, 16], [12, 16], [17, 16], [22, 16], [26, 16], [31, 16], [36, 17], [40, 17], [45, 18], [49, 19], [53, 20]],keyPoints:[[0, 14], [15, 31]]},

                                        {name:"prevSlide",points:[[-1106.3198033146518, 514.44965340313], [-31, 17], [-28, 17], [-25, 17], [-22, 18], [-18, 18], [-15, 18], [-12, 18], [-9, 18], [-5, 18], [-2, 18], [1, 18], [4, 18], [8, 18], [11, 18], [14, 18], [17, 17], [21, 17], [24, 16], [27, 16], [30, 15], [33, 14], [37, 14], [40, 13], [43, 13], [46, 12], [50, 12], [53, 12], [56, 12], [59, 11], [62, 11], [65, 11]],keyPoints:[[0, 31]]},

                                        {name:"startSlide",points:[[1137.9687595158357, -818.2968766207707], [30, -27], [23, -27], [17, -27], [10, -27], [4, -27], [-2, -23], [-6, -19], [-9, -13], [-10, -7], [-9, -1], [-4, 4], [1, 8], [6, 10], [13, 12], [19, 13], [25, 14], [31, 16], [36, 19], [39, 25], [41, 32], [41, 38], [41, 44], [38, 49], [33, 53], [27, 55], [20, 57], [14, 58], [8, 57], [2, 55], [-4, 54], [-10, 53]],keyPoints:[[0, 31]]},

                                        {name:"endSlide",points:[[380.2360589276223, 627.8682679118617], [19, 19], [26, 16], [33, 12], [38, 8], [44, 3], [47, -4], [41, -8], [35, -13], [28, -16], [21, -18], [14, -19], [6, -19], [-2, -18], [-8, -15], [-13, -9], [-16, -2], [-17, 5], [-17, 13], [-17, 20], [-15, 27], [-11, 33], [-5, 39], [1, 43], [7, 47], [14, 48], [21, 50], [29, 50], [36, 49], [43, 48], [50, 46], [56, 43]],keyPoints:[[0, 31]]}],s2101121:[0],s0001011:[1],s2000032:[2],s2000033:[3], touchStart: function (e) {
//    e.preventDefault();
  },
  findParameters: function (points, pointCount, avgX, avgY, interval, keyPoints) {
    /*
      This function finds the parameters of the gesture
      and returns them as an array
      Structure of parameters array:

      parameters[0] = partition
      parameters[1] = crossover
      parameters[2] = vertical
      parameters[3] = horizontal
      parameters[4] = strokes
      parameters[5] = xDeviation
      parameters[6] = yDeviation

    */


    var  partitionEntered = [-99, 0, 0, 0, 0], xanchorPoint = 0, yanchorPoint = 0, iterator = 0, horizontalThreshold = 10, verticalThreshold = 10, verticalLine = 0, horizontalLine = 0, xpointCounter = 0, ypointCounter = 0, crossoverIterator = 1, crossoverCount = 0, parameters = [], portion = [0, 0, 0, 0, 0, 0], xDeviation = 0, yDeviation = 0, xtempDev = -1, ytempDev = -1, strokes, x, y, dist11, dist12, dist21, dist22, X11, X12, X21, X22, Y11, Y12, Y21, Y22, A1, B1, C1, A2, B2, C2, del;
    while (iterator < pointCount - 1) {
      //Find vertical line
      //Finding nomber of deviations
      if (iterator < pointCount - 4) {
        if ((points[iterator][0] - points[iterator + 1][0]) < 0 && (points[iterator + 1][0] - points[iterator + 2][0]) < 0 && (points[iterator + 2][0] - points[iterator + 3][0]) < 0 && (points[iterator + 3][0] - points[iterator + 4][0]) < 0) {
          if (xtempDev !== 0) {
            xDeviation++;
          }
          xtempDev = 0;
        } else if ((points[iterator][0] - points[iterator + 1][0]) > 0 && (points[iterator + 1][0] - points[iterator + 2][0]) > 0 && (points[iterator + 2][0] - points[iterator + 3][0]) > 0 && (points[iterator + 3][0] - points[iterator + 4][0]) > 0) {
          if (xtempDev !== 1) {
            xDeviation++;
          }
          xtempDev = 1;
        }
        if ((points[iterator][1] - points[iterator + 1][1]) < 0 && (points[iterator + 1][1] - points[iterator + 2][1]) < 0 && (points[iterator + 2][1] - points[iterator + 3][1]) < 0 && (points[iterator + 3][1] - points[iterator + 4][1]) < 0) {
          if (ytempDev !== 0) {
            yDeviation++;
          }
          ytempDev = 0;
        } else if ((points[iterator][1] - points[iterator + 1][1]) > 0 && (points[iterator + 1][1] - points[iterator + 2][1]) > 0 && (points[iterator + 2][1] - points[iterator + 3][1]) > 0 && (points[iterator + 3][1] - points[iterator + 4][1]) > 0) {
          if (ytempDev !== 1) {
            yDeviation++;
          }
          ytempDev = 1;
        }
      }
      if (Math.abs(points[xanchorPoint][0] - points[iterator + 1][0]) < verticalThreshold) {
        xpointCounter = xpointCounter + 1;
      } else if (verticalLine < xpointCounter) {
        verticalLine = xpointCounter;
        xpointCounter = 0;
        xanchorPoint = iterator;
        parameters[0] = verticalLine + 0.5;
      } else {
        xanchorPoint = iterator;
        xpointCounter = 0;
      }
      if (verticalLine < xpointCounter) {
        verticalLine = xpointCounter;
      }
      //Find horizontal line
      if (Math.abs(points[yanchorPoint][1] - points[iterator + 1][1]) < horizontalThreshold) {
        ypointCounter++;
      } else if (horizontalLine < ypointCounter) {
        horizontalLine = ypointCounter;
        parameters[1] = horizontalLine + 0.6;
        yanchorPoint = iterator;
        ypointCounter = 0;
      } else {
        yanchorPoint = iterator;
        ypointCounter = 0;
      }
      if (horizontalLine < ypointCounter) {
        horizontalLine = ypointCounter;
      }
      //Find blocks in which gesture exists
      if (points[iterator][0] < (avgX + avgX / 10)) {
        if (points[iterator][1] < (avgY + avgY / 10)) {
          partitionEntered[1]++;
        } else {
          partitionEntered[3]++;
        }
      } else if (points[iterator][1] < avgY) {
        partitionEntered[2]++;
      } else {
        partitionEntered[4]++;
      }
      //Find crossover
      crossoverIterator = iterator + 2;
      while (crossoverIterator <= pointCount - 2) {
        /*
          Mathematically finding the intersection point of two segments
          to determine if they cross each other
          Simplified version of the following code:
          var X11=points [iterator] [0];
          var Y11=points [iterator] [1];
          var X12=points [iterator+1] [0];
          var Y12=points [iterator+1] [1];
          var X21=points [crossoverIterator] [0];
          var Y21=points [crossoverIterator] [1];
          var X22=points [crossoverIterator+1] [0];
          var Y22=points [crossoverIterator+1] [1];
          var A1=Y11-Y12;
          var B1=X12-X11;
          var C1=(-1)*B1*Y11+(-1)*A1*X11;
          var A2=Y21-Y22;
          var B2=X22-X21;
          var C2=(-1)*B2*Y21+(-1)*A2*X21;
          var del=A1*B2-A2*B1;
          if (del!===0) {
          var x=(-1)*(B2*C1 - B1*C2)/del;
          var y=(-1)*(A1*C2 - A2*C1)/del;
          }
        */
        X11 = points[iterator][0];
        Y11 = points[iterator][1];
        X12 = points[iterator + 1][0];
        Y12 = points[iterator + 1][1];
        X21 = points[crossoverIterator][0];
        Y21 = points[crossoverIterator][1];
        X22 = points[crossoverIterator + 1][0];
        Y22 = points[crossoverIterator + 1][1];
        A1 = points[iterator][1] - points[iterator + 1][1];
        B1 = points[iterator + 1][0] - points[iterator][0];
        C1 = (-1) * B1 * points[iterator][1] + (-1) * A1 * points[iterator][0];
        A2 = points[crossoverIterator][1] - points[crossoverIterator + 1][1];
        B2 = points[crossoverIterator + 1][0] - points[crossoverIterator][0];
        C2 = (-1) * B2 * points[crossoverIterator][1] + (-1) * A2 * points[crossoverIterator][0];
        del = A1 * B2 - A2 * B1 ;
        if (del !== 0) {
          x = (-1) * (B2 * C1 - B1 * C2) / del;
          y = (-1) * (A1 * C2 - A2 * C1) / del;
        }
        dist11 = Math.sqrt((points[iterator][0] - x) * (points[iterator][0] - x) + (points[iterator][1] - y) * (points[iterator][1] - y));
        dist12 = Math.sqrt((points[iterator + 1][0] - x) * (points[iterator + 1][0] - x) + (points[iterator + 1][1] - y) * (points[iterator + 1][1] - y));
        dist21 = Math.sqrt((points[crossoverIterator][0] - x) * (points[crossoverIterator][0] - x) + (points[crossoverIterator][1] - y) * (points[crossoverIterator][1] - y));
        dist22 = Math.sqrt((points[crossoverIterator + 1][0] - x) * (points[crossoverIterator + 1][0] - x) + (points[crossoverIterator + 1][1] - y) * (points[crossoverIterator + 1][1] - y));
        if (((dist11 + dist12) < interval + 2) && ((dist11 + dist12) > interval - 2)) {
          if (((dist21 + dist22) < interval + 2) && ((dist21 + dist22) > interval - 2)) {
            crossoverCount++;
          }
        }
        crossoverIterator++;
      }
      iterator++;
    }
    portion[0] = partitionEntered[1] + partitionEntered[2]; //Top half
    portion[1] = partitionEntered[3] + partitionEntered[4]; //Bottom
    portion[2] = partitionEntered[1] + partitionEntered[3]; //Left
    portion[3] = partitionEntered[4] + partitionEntered[2]; //Right
    strokes = 0;
    if (keyPoints.length > 1) {
      strokes = 1;
    }
    parameters[0] = portion.indexOf(Math.max(portion[0], portion[1], portion[2], portion[3])); //partition
    if (crossoverCount > 3) {
      parameters[1] = 4;
    } else {
      parameters[1] = crossoverCount;
    }
    if (verticalLine > 10) {
      parameters[2] = 1;
    }
    else {
      parameters[2] = 0;
    }
    if (horizontalLine > 10) {
      parameters[3] = 1;
    }
    else {
      parameters[3] = 0;
    }
    parameters[4] = strokes;
    if (xDeviation > 5) {
      parameters[5] = 6;
    } else {
      parameters[5] = xDeviation;
    }
    if (yDeviation > 5) {
      parameters[6] = 6;
    } else {
      parameters[6] = yDeviation;
    }

    Sandman.currentParameters = "s" + parameters [0]+ parameters [1]+ parameters [2]+ parameters [3]+ parameters [4]+ parameters [5]+ parameters [6];

    return parameters;
  },
  mouseMove: function (e, ptr, array) {
/*
  if (ptr!==0) {
  window.scrollTo ( Sandman.scrollX + e.clientX - array [ptr-1] [0], Sandman.scrollY + e.clientY - array [ptr-1] [1]);
      Sandman.scrollX = Sandman.scrollX + e.clientX - array [ptr-1] [0];
      Sandman.scrollY = Sandman.scrollY + e.clientY - array [ptr-1] [1];
    if ( Sandman.scrollX >0) {
    Sandman.drawDiv.style.top =     Sandman.scrollX + "px";
}
if ( Sandman.scrollY>0) {
 Sandman.drawDiv.style.top =     Sandman.scrollY+"px";
}

}*/
if (Sandman.context === null) {


Sandman.drawCanvas (Sandman.domElements);

//    Sandman.drawDiv.blur ();
}
    //Storing the input points in array
    array[ptr] = [e.clientX, e.clientY];
    //Plotting the stored



    Sandman.context.beginPath();
    Sandman.context.arc( e.clientX*Sandman.drawRatioX,e.clientY* Sandman.drawRatioY, 1, 0, Math.PI, true);
    Sandman.context.strokeStyle = 'black';
    Sandman.context.stroke();


    return array;
  },

  touchMoving: function (e, ptr, array) {

/*
if (ptr!==0) {
 window.scrollTo ( Sandman.scrollX + e.touches[0].pageX - array [ptr-1] [0], Sandman.scrollY + e.touches[0].pageY - array [ptr-1] [1]);
      Sandman.scrollX = Sandman.scrollX + e.touches[0].pageX - array [ptr-1] [0];
      Sandman.scrollY = Sandman.scrollY + e.touches[0].pageY - array [ptr-1] [1];
}
*/

if (Sandman.context === null) {
//Sandman.drawCanvas (Sandman.domElements);
//    Sandman.drawDiv.blur ();
}
    // Taking the input points
    array[ptr] = [e.touches[0].pageX, e.touches[0].pageY];
    //Plotting the point

  // Sandman.context.beginPath();
//Sandman.context.arc(array [ptr] [0]*Sandman.drawRatioX,array [ptr] [1]* Sandman.drawRatioY, 1, 0, Math.PI, true);
//    Sandman.context.strokeStyle = 'black';
//   Sandman.context.stroke();
    return array;
  },
  path_length: function (ptr, array, keyPoints) {
    /*
      This function find the total length of
      the gesture
    */
    var y = 1, len = 0, temp = 0, i=0;
    while (y < ptr) {
      if (( y -1) === keyPoints [i] [1]) {
        y++;
        if (i<keyPoints.length-1) {
          i++;
        }
      }
      temp = (array[y][0] - array[y - 1][0]) * (array[y][0] - array[y - 1][0]) + (array[y][1] - array[y - 1][1]) * (array[y][1] - array[y - 1][1]);
      len = len + Math.sqrt(temp);
      y = y + 1;
    }
    return len;
  },
  fft: function (sampled2d, n, inv) {
    /*
      This  function calculates the Fast Fourier Transform
      of the given points
      if inv = 1, returns fft
      if inv = -1, return idft
    */
    var Aeven = [], Aodd = [], Veven = [], Vodd = [], V = [], i;
    if (n === 1) {
      return sampled2d;
    }
    for (i = 0; i <= n - 2; i = i + 2) {
      Aeven[i / 2] = [sampled2d[i][0], sampled2d[i][1]];
      Aodd[i / 2] = [sampled2d[i + 1][0], sampled2d[i + 1][1]];
    }
    Veven = Sandman.fft(Aeven, n / 2, inv);
    Vodd = Sandman.fft(Aodd, n / 2, inv);
    for (i = 0; i < n / 2; i++) {
      //Calculating the real and imaginary parts of the transform
      V[i] = [(Veven[i][0] + Math.cos((2 * Math.PI * (i * Sandman.samplePoints / n)) / Sandman.samplePoints) * Vodd[i][0] - inv * Math.sin((2 * Math.PI * (i * Sandman.samplePoints / n)) / Sandman.samplePoints) * Vodd[i][1]), (Veven[i][1] + Math.cos((2 * Math.PI * (i * Sandman.samplePoints / n)) / Sandman.samplePoints) * Vodd[i][1] + inv * Math.sin((2 * Math.PI * (i * Sandman.samplePoints / n)) / Sandman.samplePoints) * Vodd[i][0])];
      V[n / 2 + i] = [(Veven[i][0] - Math.cos((2 * Math.PI * (i * Sandman.samplePoints / n)) / Sandman.samplePoints) * Vodd[i][0] + inv * Math.sin((2 * Math.PI * (i * Sandman.samplePoints / n)) / Sandman.samplePoints) * Vodd[i][1]), (Veven[i][1] - Math.cos((2 * Math.PI * (i * Sandman.samplePoints / n)) / Sandman.samplePoints) * Vodd[i][1] - inv * Math.sin((2 * Math.PI * (i * Sandman.samplePoints / n)) / Sandman.samplePoints) * Vodd[i][0])];
    }
    return V;
  },
  gestureReverser: function(keypoints,points) {
    /*
      This function merges two strokes in a gestures
      whose end points are close to each other
    */

    var iter1=0, iter2=0, iter3=0, iter4=0, pointThreshold =15, tempPtr=0, matched=0, tempArr=[], len = points.length, newKeyPoints = [], revPtr=0, swapVar=0;
    for (iter3=0; iter3<keypoints.length;iter3++) {
      keypoints [iter3].push (0);
    }
    for (iter3=keypoints [0] [0]; iter3<=keypoints [0] [1];iter3++) {
      tempArr [tempPtr] = points [iter3];
      tempPtr++;
    }
    newKeyPoints [0] = [0,tempPtr-1];
    keypoints [0] [2] = 1;
    iter1 = 0;
    while (1) {
      if (tempPtr >= len) {
        break;
      }
      for(iter2=0;iter2<keypoints.length;iter2++) {
        if ( keypoints [iter2] [2] === 1) {
          continue;
        }
        if(((Math.abs(tempArr[newKeyPoints[iter1][0]][0]-points[keypoints[iter2][0]][0])<pointThreshold) && (Math.abs(tempArr[newKeyPoints[iter1][0]][1]-points[keypoints[iter2][0]][1])<pointThreshold))) {
          // Both's Start points  match
          revPtr =0;
          swapVar =0;
          for (iter3 = newKeyPoints [newKeyPoints.length-1] [0],revPtr =newKeyPoints [newKeyPoints.length-1] [1];iter3<revPtr;iter3++,revPtr--) {
            swapVar = tempArr [iter3];
            tempArr [iter3] = tempArr [revPtr];
            tempArr [revPtr] = swapVar;
          }
          for(iter3=keypoints[iter2][0];iter3<=keypoints[iter2][1];iter3++) {
            tempArr[tempPtr++]=points[iter3];
          }
          keypoints [iter2] [2] = 1;
          newKeyPoints [newKeyPoints.length-1] [1] = tempPtr-1;
          matched=1;
        }
        else if (((Math.abs(tempArr[newKeyPoints[iter1][1]][0]-points[keypoints[iter2][1]][0])<pointThreshold) && (Math.abs(tempArr[newKeyPoints[iter1][1]][1]-points[keypoints[iter2][1]][1])<pointThreshold))) {
          // Both's End points match
          for(iter3=keypoints[iter2][1];iter3>=keypoints[iter2][0];iter3--) {
            tempArr[tempPtr++]=points[iter3];
          }
          keypoints [iter2] [2] = 1;
          newKeyPoints [newKeyPoints.length-1] [1] = tempPtr-1;
          matched=1;
        }
        else if(((Math.abs(tempArr[newKeyPoints[iter1][1]][0]-points[keypoints[iter2][0]][0])<pointThreshold) && (Math.abs(tempArr[newKeyPoints[iter1][1]][1]-points[keypoints[iter2][0]][1])<pointThreshold)) ) {
          //  tempEnd - arrayStart match
          for(iter3=keypoints[iter2][0];iter3<=keypoints[iter2][1];iter3++) {
            tempArr[tempPtr++]=points[iter3];
          }
          keypoints [iter2] [2] = 1;
          newKeyPoints [newKeyPoints.length-1] [1] = tempPtr-1;
          matched=1;
        }
        else if (((Math.abs(tempArr[newKeyPoints[iter1][0]][0]-points[keypoints[iter2][1]][0])<pointThreshold) && (Math.abs(tempArr[newKeyPoints[iter1][0]][1]-points[keypoints[iter2][1]][1])<pointThreshold))) {
          // tempStart - arrayEnd match
          revPtr =0 ;
          swapVar =0;
          for (iter3 = newKeyPoints [newKeyPoints.length-1] [0],revPtr =newKeyPoints [newKeyPoints.length-1] [1];iter3<revPtr;iter3++,revPtr--) {
            swapVar = tempArr [iter3];
            tempArr [iter3] = tempArr [revPtr];
            tempArr [revPtr] = swapVar;
          }
          for(iter3=keypoints[iter2][1];iter3>=keypoints[iter2][0];iter3--) {
            tempArr[tempPtr++]=points[iter3];
          }
          keypoints [iter2] [2] = 1;
          newKeyPoints [newKeyPoints.length-1] [1] = tempPtr-1;
          matched=1;
        }
      }
      if (matched === 0) {
        iter1++;
        newKeyPoints [newKeyPoints.length] = [newKeyPoints [newKeyPoints.length-1] [1]+1,0];
        iter3=0;
        while (1) {
          if(iter3>=keypoints.length) {
            break;
          }
          if ((keypoints [iter3] [2]===0)) {
            break;
          }
          iter3++;
        }
        if (iter3 === keypoints.length) {
          break;
        }
        else {
          iter4 =0;
          for(iter4=keypoints[iter3][0];iter4<=keypoints[iter3][1];iter4++) {
            tempArr[tempPtr++]=points[iter4];
          }
          keypoints [iter3] [2] = 1;
          newKeyPoints [newKeyPoints.length-1] [1] = tempPtr-1;
        }
      }
      else {
        matched =0;
      }
    }
    Sandman.keyPoints = newKeyPoints;


    return tempArr;

  } ,
  compare: function(arr1,arr2,start1,end1,start2,end2) {
  /*
      This function compares arr1 from start1 to end1 with
      arr2 from start2 to end2 and returns the number of points
      matched
    */
  var comp1=1,comp2=1,iter1=0,iter2=0, pointThreshold=15, score=0;
    if(start1>end1) {
      comp1=-1;
    }
    if(start2>end2){
      comp2=-1;
    }
    iter2=start2;
    for(iter1=0;( iter1<Math.abs(end1-start1)) && (iter2<Math.abs(end2-start2));iter1=iter1+comp1){
      if((Math.abs(arr1[iter1+start1][0]-arr2[iter2][0])<pointThreshold)&&(Math.abs(arr1[iter1+start1][1]-arr2[iter2][1])<pointThreshold)){
        score++;
      }
      iter2=iter2+comp2;
    }
    return score;
  },

  gestureCompare: function (rounded, parameterArray,newKeyPoints) {
    /*
      Contains the main algorith of gestures comparison.
      This function compares the drawn gesture with the stored gestures
    */


    var  crossIter = 0, horizIter = 0, vertIter = 0, xIter = 0, yIter = 0, gest2 = rounded, cnt = 0, resCnt = 0, pointThreshold = 15, fourierThreshold = 16, keyPoints = newKeyPoints, setLength, setIter = 0, maxMatchedIndex = 0, maxMatched = -1, gestPtr =0, checked = 0, gest2Ptr =0, didNotMatch=-1, gest1=[], noOfStrokes, keyPointsGest1, gest2Lowest, gest1Lowest, iter, count, score, start2, end2, start1, end1, strokeLen,comp1=1, comp2=1, iter1=0, iter2=0, gest1Ptr;

    Sandman.keyPoints = newKeyPoints;
    Sandman.currentGesture = gest2;
    for (xIter = 0; xIter < 7; xIter++) {
      parameterArray[5] = (parameterArray[5] + 1) % 7;
      for (yIter = 0; yIter < 7; yIter++) {
        parameterArray[6] = (parameterArray[6] + 1) % 7;
        for (crossIter = 0; crossIter < 5; crossIter++) { // shud be 5
          parameterArray[1] = (parameterArray[1] + 1) % 5;
          for (horizIter = 0; horizIter < 2; horizIter++) {
            parameterArray[3] = (parameterArray[3] + 1) % 2;
            for (vertIter = 0; vertIter < 2; vertIter++) {
              parameterArray[2] = (parameterArray[2] + 1) % 2;
              for (iter = 0; iter < 4; iter++) { // shud be 4
                resCnt = 0;
                cnt++;
                parameterArray[0] = (parameterArray[0] + 1) % 4;
                Sandman.set = "s" + parameterArray[0] + parameterArray[1] + parameterArray[2] + parameterArray[3] + parameterArray[4] + parameterArray[5] + parameterArray[6];
                if (typeof (window.Sandman[Sandman.set]) !== "undefined") {
                  setLength = (window.Sandman[Sandman.set]).length;
                  setIter = 0;
                  for (setIter = 0; setIter < setLength; setIter++) {
                      gest1 = [];
                    resCnt = 0;
                    gestPtr =0;
                    checked = 0;
                    gest2Ptr =0;
                    didNotMatch=-1;
                    gest1.push(Sandman.gestureArray[window.Sandman[Sandman.set][setIter]].name);
                    for(i=0;i<Sandman.samplePoints;i++) {
                      gest1.push (Sandman.gestureArray[window.Sandman[Sandman.set][setIter]].points[i]);
                    }

                    if ( Sandman.gestureArray[window.Sandman[Sandman.set][setIter]].keyPoints.length !== keyPoints.length) {
                      // different number of strokes in gesture
                      continue;
                    }
                    noOfStrokes = Sandman.gestureArray[window.Sandman[Sandman.set][setIter]].keyPoints.length;
                    keyPointsGest1 = Sandman.gestureArray[window.Sandman[Sandman.set][setIter]].keyPoints;
                    // multiple strokes
                    while (gest2Ptr<keyPoints.length)
                    {
                      if ( Math.abs ( gest2 [ keyPoints [gest2Ptr] [0]+1] [0] - gest2 [ keyPoints [gest2Ptr] [1]] [0] ) < pointThreshold  &&  Math.abs ( gest2 [ keyPoints [gest2Ptr] [0]+1] [1] - gest2 [ keyPoints [gest2Ptr] [1]] [1])<pointThreshold ) {
                        // Circular sub-gesture
                        //Finding lowest point in gest2
                        gest2Lowest =keyPoints [gest2Ptr] [0]+1;
                        iter=0;
                        for (iter = keyPoints [gest2Ptr] [0]+2; iter<=keyPoints [gest2Ptr] [1];iter++) {
                          if (gest2 [iter] [0] < gest2 [gest2Lowest] [0]) {
                            gest2Lowest=iter;
                          }
                          else if (gest2 [iter] [0] === gest2 [gest2Lowest] [0] ) {
                            if (gest2 [iter] [1] < gest2 [gest2Lowest] [1] ) {
                              gest2Lowest=iter;
                            }
                          }
                        }
                        for (gest1Ptr =0; gest1Ptr<keyPointsGest1.length;gest1Ptr++) {
                          if ( Math.abs ( gest1 [ keyPointsGest1 [gest1Ptr] [0]+2] [0] - gest1 [ keyPointsGest1 [gest1Ptr] [1]] [0] ) < pointThreshold  &&  Math.abs ( gest1 [ keyPointsGest1 [gest1Ptr] [0]+2] [1] - gest1 [ keyPointsGest1 [gest1Ptr] [1]] [1])<pointThreshold ) {
                            //searching for circular sub-gesture ^
                            //Finding lowest point in gest1
                            gest1Lowest =keyPointsGest1 [gest1Ptr] [0] +2;
                            for (iter = keyPointsGest1 [gest1Ptr] [0] +3 ; iter<=keyPointsGest1 [gest1Ptr] [1];iter++) {
                              if (gest1 [iter] [0] < gest1 [gest1Lowest] [0]) {
                                gest1Lowest=iter;
                              }
                              else if (gest1 [iter] [0] === gest1 [gest1Lowest] [0] ) {
                                if (gest1 [iter] [1] < gest1 [gest1Lowest] [1] ) {
                                  gest1Lowest=iter;
                                }
                              }
                            }


                            if (Math.abs ( gest1 [gest1Lowest] [0] - gest2 [gest2Lowest] [0])>pointThreshold || Math.abs(gest1 [gest1Lowest] [1] - gest2 [gest2Lowest] [1] >pointThreshold)) {
                              //does not match
                              break;
                            }
                            if (( gest1 [gest1Lowest] [1] > gest1 [( gest1Lowest+2)%Sandman.samplePoints] [1]) && (gest2 [gest2Lowest] [1] > gest2 [( gest2Lowest+2)%Sandman.samplePoints] [1]) ||( gest1 [gest1Lowest] [1] < gest1 [( gest1Lowest+2)%Sandman.samplePoints] [1]) && (gest2 [gest2Lowest] [1] < gest2 [( gest2Lowest+2)%Sandman.samplePoints] [1]) ) {
                              // Straight checking of (gest2 from keyPoints [gest2Ptr] [0] to keyPoints [gest2Ptr] [1])  with (gest 1 from keyPointsGest1 [gestPtr] [0] to keyPointsGest1 [gest2Ptr] [1])
                              iter1=0,iter2=0;
                              score=0;
                              start2 = keyPoints [gest2Ptr] [0];
                              end2 =  keyPoints [gest2Ptr] [1];
                              start1 = keyPointsGest1 [gest1Ptr] [0];
                              end1 = keyPointsGest1 [gest1Ptr] [1];
                              strokeLen = Math.abs ( start1-end1);
                              count=0;
                              for(iter1=gest1Lowest-start1,iter2 = gest2Lowest - start2;count<strokeLen;iter1++,iter2++) {
                                if (Math.abs (gest1 [start1 + iter1%strokeLen] [0] - gest2 [start2 +iter2%strokeLen] [0])< pointThreshold && Math.abs (gest1 [start1+iter1%strokeLen] [1] - gest2 [start2 +iter2%strokeLen] [1])< pointThreshold) {
                                  resCnt++;
                                }
                                count++;
                              }
                              // if the stroke matches, checked = 1;
                              checked = 1;
                            }
                            else {
                              // Reverse checking of (gest2 from keyPoints [gest2Ptr] [0] to keyPoints [gest2Ptr] [1])  with (gest 1 from keyPointsGest1 [gestPtr] [1] to keyPointsGest1 [gest2Ptr] [0])
                              comp1=1;
                              comp2=1;
                              iter1=0;
                              iter2=0;
                              count =0;
                              score=0;
                              start2 = keyPoints [gest2Ptr] [0];
                              end2 =  keyPoints [gest2Ptr] [1];
                              start1 = keyPointsGest1 [gest1Ptr] [0];
                              end1 = keyPointsGest1 [gest1Ptr] [1];
                              strokeLen = Math.abs ( start1-end1);
                              if (start1 > end1) {
                                for(iter1=end1 - gest1Lowest,iter2 = gest2Lowest - start2;count<strokeLen;iter1++,iter2++) {

                                  if (Math.abs (gest1 [end1 - iter1%strokeLen] [0] - gest2 [start2 +iter2%strokeLen] [0])< pointThreshold && Math.abs (gest1 [end1 - iter1%strokeLen] [1] - gest2 [start2 +iter2%strokeLen] [1])< pointThreshold) {
                                    resCnt++;
                                  }
                                  count++;
                                }
                              }
                              else {
                                for(iter1=gest1Lowest-start1,iter2 = end2 - gest2Lowest;count<strokeLen;iter1++,iter2++) {

                                  if (Math.abs (gest1 [start1 + iter1%strokeLen] [0] - gest2 [end2 - iter2%strokeLen] [0])< pointThreshold && Math.abs (gest1 [start1+iter1%strokeLen] [1] - gest2 [end2 - iter2%strokeLen] [1])< pointThreshold) {
                                    resCnt++;
                                  }
                                  count++;
                                }
                              }
                              count=0;
                              checked = 1;
                            }
                          }
                        }
                      }
                      else {
                        // non circular Sub-gesture
                        checked=1;
                        for (gest1Ptr =0 ; gest1Ptr<keyPointsGest1.length;gest1Ptr++) {
                          if (( Math.abs((gest1[keyPointsGest1 [gest1Ptr] [0] + 2][0]) - (gest2[keyPoints [gest2Ptr] [0]+ 1][0])) <= ( pointThreshold+5) && Math.abs((gest1[keyPointsGest1 [gest1Ptr] [0] + 2][1]) - (gest2[keyPoints [gest2Ptr] [0]+1][1])) <= ( pointThreshold+5)) || (Math.abs((gest1[keyPointsGest1 [gest1Ptr] [1]][0]) - (gest2[keyPoints [gest2Ptr] [1]][0])) <= ( pointThreshold+5) && Math.abs((gest1[keyPointsGest1 [gest1Ptr] [1]][1]) - (gest2[keyPoints [gest2Ptr] [1]][1])) <= ( pointThreshold+5))) {
                            // Straight checking of entire array.
                            resCnt = resCnt + Sandman.compare (gest1, gest2, keyPointsGest1 [gest1Ptr] [0], keyPointsGest1 [gest1Ptr] [1], keyPoints [gest2Ptr] [0], keyPoints [gest2Ptr] [1]);
                          }
                          else if (( Math.abs((gest1[keyPointsGest1 [gest1Ptr] [0] + 2][0]) - (gest2[keyPoints [gest2Ptr] [1]][0])) <= ( pointThreshold+5) && Math.abs((gest1[keyPointsGest1 [gest1Ptr] [0] + 2][1]) - (gest2[keyPoints [gest2Ptr] [1]][1])) <= ( pointThreshold+5)) || (Math.abs((gest1[keyPointsGest1 [gest1Ptr] [1]][0]) - (gest2[keyPoints [gest2Ptr] [0]+1][0])) <= ( pointThreshold+5) && Math.abs((gest1[keyPointsGest1 [gest1Ptr] [1]][1]) - (gest2[keyPoints [gest2Ptr] [0]+1][1])) <= ( pointThreshold+5))) {
                            // comparing gest1 with reverse of gest2.
                            resCnt = resCnt + Sandman.compare (gest1, gest2, keyPointsGest1 [gest1Ptr] [1], keyPointsGest1 [gest1Ptr] [0], keyPoints [gest2Ptr] [0], keyPoints [gest2Ptr] [1]);
                          }
                        }
                      }
                      if (checked !== 1 ) {
                        didNotMatch =1;
                        break;
                      }
                      gest2Ptr++;
                    }
                    if (checked === 1) {
                      if (maxMatched <resCnt) {
                        maxMatchedIndex = window.Sandman[Sandman.set][setIter];
                        maxMatched = resCnt;
                      }
                    }
                  }
                }
if(maxMatched>0)
                if (maxMatched >= fourierThreshold) {
                  console.log("You have drawn: " + Sandman.gestureArray[maxMatchedIndex].name + ", " + maxMatched + " points matched");
                  if (typeof ( window [Sandman.gestureArray[maxMatchedIndex].name])==='function') {
                    window [Sandman.gestureArray[maxMatchedIndex].name] ();
                    return;
                  }
                  return;
                }
              }
            }
          }
        }
      }
    }

if (maxMatched >= 2) {
                  console.log("You have drawn: " + Sandman.gestureArray[maxMatchedIndex].name + ", " + maxMatched + " points matched");
                  if (typeof ( window [Sandman.gestureArray[maxMatchedIndex].name])==='function') {
                    window [Sandman.gestureArray[maxMatchedIndex].name] ();
                  }
                }
  },


  sample: function (ptr, array, minMax, keyPoints) {
    /*
      This function performs smoothening of the gestures and interpolation
    */

    if (Sandman.isTouchDevice===1) {
      window.scrollTo ( Sandman.scrollX - ( array [ptr-1] [0] - array [0] [0]), Sandman.scrollY - ( array [ptr-1] [0] - array [0] [1]));
      Sandman.scrollX = Sandman.scrollX - ( array [ptr-1] [0] - array [0] [0]);
      Sandman.scrollY = Sandman.scrollY - ( array [ptr-1] [0] - array [0] [1]);
}
    Sandman.keyPoints = keyPoints;
    if (ptr <= 0) {
      return;
    }
    var pointer =0, looper, i = 1, leng, sampledX = [], sampledY = [], samplePt = 0, interval, tempDist = 0, add = 0, interPixelDist = 0, scaleFactor, keyPtr =0, newKeyPoints = [], sampled2d = [], parameterArray, output, rounded, templ, see = 0;
    //Smoothening of gesture
    while (pointer < Sandman.keyPoints.length) {
      if ((Sandman.keyPoints [pointer] [1] - Sandman.keyPoints [pointer] [0]) <= 15) {
        pointer++;
        continue;
      }


      for (looper = ( Sandman.keyPoints [pointer] [0])+5; looper < ( Sandman.keyPoints [pointer] [1])-6; looper++) {

        array[looper][0] = Math.floor((array[looper - 5][0] + array[looper - 4][0] + array[looper - 3][0] + array[looper - 2][0] + array[looper - 1][0] + array[looper][0] + array[looper + 1][0] + array[looper + 2][0] + array[looper + 3][0] + array[looper + 4][0] + array[looper + 5][0]) / 11);
        array[looper][1] = Math.floor((array[looper - 5][1] + array[looper - 4][1] + array[looper - 3][1] + array[looper - 2][1] + array[looper - 1][1] + array[looper][1] + array[looper + 1][1] + array[looper + 2][1] + array[looper + 3][1] + array[looper + 4][1] + array[looper + 5][1]) / 11);
      }

      array[looper - 5][0] = Math.floor((array[looper - 10][0] + array[looper - 9][0] + array[looper - 8][0] + array[looper - 7][0] + array[looper - 6][0] + array[looper - 5][0] + array[looper - 4][0] + array[looper - 3][0] + array[looper - 2][0] + array[looper - 1][0]) / 10);
      array[looper - 5][1] = Math.floor((array[looper - 10][1] + array[looper - 9][1] + array[looper - 8][1] + array[looper - 7][1] + array[looper - 6][1] + array[looper - 5][1] + array[looper - 4][1] + array[looper - 3][1] + array[looper - 2][1] + array[looper - 1][1]) / 10);
      array[looper - 4][0] = Math.floor((array[looper - 9][0] + array[looper - 8][0] + array[looper - 7][0] + array[looper - 6][0] + array[looper - 5][0] + array[looper - 4][0] + array[looper - 3][0] + array[looper - 2][0] + array[looper - 1][0]) / 9);
      array[looper - 4][1] = Math.floor((array[looper - 9][1] + array[looper - 8][1] + array[looper - 7][1] + array[looper - 6][1] + array[looper - 5][1] + array[looper - 4][1] + array[looper - 3][1] + array[looper - 2][1] + array[looper - 1][1]) / 9);
      array[looper - 3][0] = Math.floor((array[looper - 8][0] + array[looper - 7][0] + array[looper - 6][0] + array[looper - 5][0] + array[looper - 4][0] + array[looper - 3][0] + array[looper - 2][0] + array[looper - 1][0]) / 8);
      array[looper - 3][1] = Math.floor((array[looper - 8][1] + array[looper - 7][1] + array[looper - 6][1] + array[looper - 5][1] + array[looper - 4][1] + array[looper - 3][1] + array[looper - 2][1] + array[looper - 1][1]) / 8);
      array[looper - 2][0] = Math.floor((array[looper - 7][0] + array[looper - 6][0] + array[looper - 5][0] + array[looper - 4][0] + array[looper - 3][0] + array[looper - 2][0] + array[looper - 1][0]) / 7);
      array[looper - 2][1] = Math.floor((array[looper - 7][1] + array[looper - 6][1] + array[looper - 5][1] + array[looper - 4][1] + array[looper - 3][1] + array[looper - 2][1] + array[looper - 1][1]) / 7);
      array[looper - 1][0] = Math.floor((array[looper - 6][0] + array[looper - 5][0] + array[looper - 4][0] + array[looper - 3][0] + array[looper - 2][0] + array[looper - 1][0]) / 6);
      array[looper - 1][1] = Math.floor((array[looper - 6][1] + array[looper - 5][1] + array[looper - 4][1] + array[looper - 3][1] + array[looper - 2][1] + array[looper - 1][1]) / 6);
/*  */
      pointer++;
  }



    array = Sandman.gestureReverser (keyPoints,array);
    keyPoints = Sandman.keyPoints;


    minMax = [-9999,-9999,9999,9999];
    for (i=0;i<ptr;i++) {
      //min X
      if (array [i] [0] < minMax [2]) {
        minMax [2] = array [i] [0];
      }
      //max X
      if (array [i] [0] > minMax [0]) {
        minMax [0] = array [i] [0];
      }
      //min Y
      if (array [i] [1] < minMax [3]) {
        minMax [3] = array [i] [1];
      }
      //max Y
      if (array [i] [1] > minMax [1]) {
        minMax [1] = array [i] [1];
      }
    }
    //if gesture is smaller than 10x10, return
    if (Math.abs ( minMax [0] - minMax [2])<10 && Math.abs (minMax [1] - minMax [3])<10) {
      return;
    }
    leng = Sandman.path_length(ptr, array, keyPoints);
    interval = (leng / (Sandman.samplePoints - 1));
    // Canculating scalefactor by dividing the diagonal of the box containing the gesture by 100
    scaleFactor = Math.sqrt((minMax[0] - minMax[2]) * (minMax[0] - minMax[2]) + (minMax[1] - minMax[3]) * (minMax[1] - minMax[3])) / 100;
    sampledX[0] = array[0][0];
    sampledY[0] = array[0][1];
    samplePt = 1;
    newKeyPoints = [[0,-99]];
    i=1;


    // Interpolating
    while (samplePt <= Sandman.samplePoints) {
      // Calculating inter pixel distance by the distance formula
      add = (array[i][0] - array[i - 1][0]) * (array[i][0] - array[i - 1][0]) + (array[i][1] - array[i - 1][1]) * (array[i][1] - array[i - 1][1]);
      interPixelDist = Math.sqrt(add);
      if (i === Sandman.keyPoints [keyPtr] [1]) {
        i++;
        if (keyPtr < Sandman.keyPoints.length-1 ) {
          keyPtr++;
        }
        newKeyPoints [newKeyPoints.length - 1] [1] = samplePt-1;
        if (i > array.length-1) {

          break;
        }
        newKeyPoints [newKeyPoints.length]  = [samplePt,0];
      }
      if ((tempDist + interPixelDist) >= interval) {
        // Interpolation formula. Finding the pixel between two given pixels.
        sampledX[samplePt] = array[i - 1][0] + ((interval - tempDist) / interPixelDist) * (array[i][0] - array[i - 1][0]);
        sampledY[samplePt] = array[i - 1][1] + ((interval - tempDist) / interPixelDist) * (array[i][1] - array[i - 1][1]);
        array[i - 1][0] = sampledX[samplePt];
        array[i - 1][1] = sampledY[samplePt];
        tempDist = 0;
        samplePt = samplePt + 1;
        i = i - 1;
      } else {
        tempDist = tempDist + interPixelDist;
      }
      i = i + 1;
    }
    if (samplePt <= 31) {
      sampledX[samplePt] = array[ptr - 1][0];
      sampledY[samplePt] = array[ptr - 1][1];
      samplePt++;
    }
    newKeyPoints [newKeyPoints.length - 1] [1] = samplePt-1;
    keyPoints = [];
    keyPoints = newKeyPoints;
    for (i = 0; i < samplePt; i++) {
      sampled2d[i] = [];
      sampled2d[i][0] = Math.round(sampledX[i]);
      sampled2d[i][1] = Math.round(sampledY[i]);
    }

   parameterArray = Sandman.findParameters(sampled2d, Sandman.samplePoints, (minMax[0] + minMax[2]) / 2, (minMax[1] + minMax[3]) / 2, interval, newKeyPoints);
    // Taking fourier transform
    output = Sandman.
      fft(sampled2d, Sandman.samplePoints, 1);
    rounded = output;
    //Scaling down to fixed size
    templ = output;
    for (i = 1; i < Sandman.samplePoints; i++) {
      templ[i][0] = templ[i][0] / scaleFactor;
      templ[i][1] = templ[i][1] / scaleFactor;
    }
    templ[0][0] = 500;
    templ[0][1] = 500;
    //Taking inverse fourier transform
    templ = Sandman.fft(templ, Sandman.samplePoints, -1);
    for (i = 1; i < Sandman.samplePoints; i++) {
      templ[i][0] = Math.round(templ[i][0] / Sandman.samplePoints);
      templ[i][1] = Math.round(templ[i][1] / Sandman.samplePoints);
    }
    rounded = templ;
   Sandman.set = "s" + parameterArray[0] + parameterArray[1] + parameterArray[2] + parameterArray[3] + parameterArray[4];
    Sandman.gesture[Sandman.gestPtr] = rounded;
    Sandman.gestPtr++;


    Sandman.gestureCompare(templ, parameterArray, newKeyPoints);
    samplePt = 0;
    ptr = 0;
    minMax = [-9999, -9999, 9999, 9999]; //[ maxX, maxY, minX, minY ]
    minMax [0] = -9999;
    minMax [1] = -9999;
    minMax [2] = 9999;
    minMax [3] = 9999;

  },


drawCanvas: function (domElement) {

//Sandman.d
Sandman.drawDiv.style.zIndex=10000;
Sandman.drawRatioX = 300/window.innerWidth;
Sandman.drawRatioY = 150/window.innerHeight;
    document.body.appendChild (Sandman.drawDiv);
Sandman.context = Sandman.drawDiv.getContext ('2d');

var width = Sandman.drawDiv.width;
var height = Sandman.drawDiv.height;
Sandman.imageData = Sandman.context.createImageData(width, height);
},

  doFirst: function (domElement) {




    Sandman.drawDiv = document.createElement ("canvas");
  Sandman.drawDiv.setAttribute ("style","position:fixed;margin:0px;height:"+window.innerHeight+"px;width:"+window.innerWidth+"px;left:0px;top:0px;background:white;opacity:0.5;z-index:-100");
Sandman.drawRatioX = 300/window.innerWidth;
Sandman.drawRatioY = 150/window.innerHeight;
    document.body.appendChild (Sandman.drawDiv);


    Sandman.isTouchDevice = 0;

    Sandman.domElements = domElement;
    var eventCalled = 0, input2d = [], inputPtr = 0, mouseFlag = 0, okToSample = -1, intervalSet = 0, strokeInterval = null, minMax = [], x;
    minMax = [-9999, -9999, 9999, 9999]; //[ maxX, maxY, minX, minY ]

document.body.addEventListener ("gesturestart",function () {   Sandman.isTouchDevice = 1;},false);
    document.body.addEventListener("touchstart", function (e) {
e.preventDefault ();
Sandman.isTouchDevice = 1;
       if (okToSample === -1) {
        Sandman.keyPoints = [];
      }
      okToSample = 0;
      minMax = [-9999, -9999, 9999, 9999];
    }, false);
    document.body.addEventListener("touchmove", function (e) {

      e.preventDefault ();
      if (eventCalled === 0) {
        eventCalled = 1;
        event = document.body.addEventListener("touchend", function () {
          mouseFlag = 0;
          okToSample = 1;
          if (Sandman.keyPoints.length === 0) {
            Sandman.keyPoints [0] = [0,inputPtr-1];
          } else {
            Sandman.keyPoints [Sandman.keyPoints.length] = [( Sandman.keyPoints [Sandman.keyPoints.length-1] [1])+1 , inputPtr-1];
          }
          if (intervalSet === 0) {
            intervalSet = 1;
            strokeInterval = setInterval(function () {
              if (okToSample === 1) {
                okToSample = 1;
                clearInterval(strokeInterval);
                try {
                Sandman.sample(inputPtr, input2d, minMax, Sandman.keyPoints);
//                document.body.removeChild (Sandman.drawDiv);
                  Sandman.drawDiv.style.zIndex=(- 1000);
       Sandman.context.clearRect (0,0,window.innerWidth, window.innerHeight);
                      Sandman.context = null;
                }
                  catch (e) {
                Sandman.keyPoints = [];
                array=[];

                    try {
//                document.body.removeChild (Sandman.drawDiv);
                      Sandman.drawDiv.style.zIndex=(-1000);
       Sandman.context.clearRect (0,0,window.innerWidth, window.innerHeight);
                      Sandman.context = null;
                    } catch (e) {

}

                }

                intervalSet = 0;
                inputPtr = 0;
              }
            }, 500);
          }
        }, false);
      }
      input2d = Sandman.touchMoving(e, inputPtr, input2d);
      inputPtr++;
    }, false);
    document.body.addEventListener("mousedown", function (e) {

      if (okToSample === -1) {
        Sandman.keyPoints = [];

    Sandman.drawCanvas (domElement);
      }
      okToSample = 0;
      minMax = [-9999, -9999, 9999, 9999];
      mouseFlag = 1;
      Sandman.touchStart(e);
    }, false);
    var event = null;
document.body.addEventListener ("click",function () { }, false);
    document.body.addEventListener("mousemove", function (e) {

/*
      window.scrollTo (Sandman.prevX - e.clientX, Sandman.prevY - e.clientY );
      Sandman.prevX = Sandman.prevX - e.clientX;
      Sandman.prevY = Sandman.prevY - e.clientY;
*/


      if (eventCalled === 0) {
        eventCalled = 1;
        event = document.body.addEventListener("mouseup", function () {
          mouseFlag = 0;
          okToSample = 1;
          if (Sandman.keyPoints.length === 0) {
            Sandman.keyPoints [0] = [0,inputPtr-1];
          } else {
            Sandman.keyPoints [Sandman.keyPoints.length] = [( Sandman.keyPoints [Sandman.keyPoints.length-1] [1])+1 , inputPtr-1];
          }
          if (intervalSet === 0) {
            intervalSet = 1;
            strokeInterval = setInterval(function () {
              if (okToSample === 1) {
                clearInterval(strokeInterval);
     try {

                Sandman.sample(inputPtr, input2d, minMax, Sandman.keyPoints);
                okToSample = -1;
//                document.body.removeChild (Sandman.drawDiv);
                      Sandman.drawDiv.style.zIndex=(-1000);
       Sandman.context.clearRect (0,0,window.innerWidth, window.innerHeight);
                      Sandman.context = null;
         }
    catch (e) {
                Sandman.keyPoints = [];
                array=[];

                    try {
//                document.body.removeChild (Sandman.drawDiv);
                      Sandman.drawDiv.style.zIndex=(-1000);
       Sandman.context.clearRect (0,0,window.innerWidth, window.innerHeight);
                      Sandman.context = null;
                    } catch (e) {

                    }
         }
                intervalSet = 0;
                inputPtr = 0;
              }
            }, 500);
          }
        }, false);
      }
      if (mouseFlag === 1) {
        input2d = Sandman.mouseMove(e, inputPtr, input2d);
        inputPtr++;
      }
    }, false);
    Sandman.gesture = [];
    Sandman.gestPtr = 0;

  }
};
window.addEventListener("load",function () {Sandman.doFirst("body");},false);
