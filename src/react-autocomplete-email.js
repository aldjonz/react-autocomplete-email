import React, { useState, useImperativeHandle, forwardRef, useRef, useEffect } from 'react';
import './react-autocomplete-email.css';

const EmailAutoComplete = forwardRef((props, ref) => {
    // data
    const [inputVal, setInputVal] = useState('');
    const [overlayVisible, setOverlayVisible] = useState(false);
    const [actionKeys] = useState([38,40,13,27]);
    const [matches, setMatches] = useState([]);
    const [selectedMatch, setSelectedMatch] = useState(null);
    const [vendors, setVendors] = useState([
        'gmail.com',
        'googlemail.com',
        'comcast.net',
        'yahoo.com',
        'hotmail.com',
        'hotmail.co.uk',
        'aol.com',
        'msn.com',
        'yahoo.co.uk',
        'live.com',
        'live.co.uk',
        'icloud.com'
    ])

    const autoCompleteWrapperRef = useRef(null);

    useEffect(() => {

        if(props.domains && props.domains.length > 0) {

            setVendors(props.domains);

        } else {

            setVendors([
                'gmail.com',
                'googlemail.com',
                'comcast.net',
                'yahoo.com',
                'hotmail.com',
                'hotmail.co.uk',
                'aol.com',
                'msn.com',
                'yahoo.co.uk',
                'live.com',
                'live.co.uk',
                'icloud.com'
            ]);

        }

    }, [props.domains])

    // Methods

    useImperativeHandle(ref, (e) => ({

        check(e) {

            if(isActionKey(e.keyCode)) {

                invokeAction(e, e.keyCode);
                return

            }

            const ele = e.target;
            setInputVal(ele.value);

            resetMatches();

            filterVendors(ele.value);

        }

    }));


    const isActionKey = (keyCode) => {

        return actionKeys.includes(keyCode);

    };

    const invokeAction = (e, keyCode) => {

        switch(keyCode) {

            case 38:
            //up
            e.preventDefault();
            e.stopPropagation();
            navigateSuggestions('up');
            break;

            case 40:
            //down
            e.preventDefault();
            e.stopPropagation();
            navigateSuggestions('down');
            break;

            case 13:
            //enter
            e.preventDefault();
            e.stopPropagation();
            selectSuggestion(e);
            break;

            case 27:
            //escape
            e.preventDefault();
            e.stopPropagation();
            closeOverlay();
            break;

            default:
            e.preventDefault();
            break;

        }
    };

    const navigateSuggestions = (direction) => {

        if(matches.length < 1) {
          return;
        }

        if(direction === 'down'){

          if(selectedMatch === null) {

            setSelectedMatch(0);

            return;

          } else if(selectedMatch !== null && (selectedMatch + 1) < matches.length) {

            setSelectedMatch(prevState =>
                prevState + 1
            )

            return;

          }
        }

        if(direction === 'up') {

            if(selectedMatch !== null && selectedMatch > 0) {

              setSelectedMatch(prevState =>
                prevState - 1
              )

              return;

            }

        }
    };

    const selectSuggestion = () => {

        if(selectedMatch !== null) {

          completeInput(inputVal + mapSuggestion(selectedMatch).completion);

        } else{

          setTimeout(() => {
            if(props.onSubmit) {
              props.onSubmit();
            }
          }, 0);

        }

    };

    const mapSuggestion = (matchKey) => {

        return matches[matchKey];

    };

    const completeInput = (completedStr) => {

        if(props.onCompletion){

          props.onCompletion(completedStr);

        }

        closeOverlay();

    }

    const closeOverlay = () => {

        setOverlayVisible(false);
        resetMatches();

    }

    const resetMatches = () => {

        setMatches([]);
        setSelectedMatch(null);

    }

    const assignMatches = (matches) => {

        setMatches(matches);
        setOverlayVisible(true);

    }

    const sortMatches = (matches) => {

        return matches.sort((a, b) => {

          return (a.vendor < b.vendor) ? -1 : (a.vendor > b.vendor) ? 1 : 0;

        });

    }

    const computeMatches = (vendor_search) => {

        const matches = [];

        vendors.forEach(function(vendor) {

            const partialPossibleVendor = vendor.substring(0, vendor_search.length);

            if(partialPossibleVendor.length !== vendor.length && vendor_search === partialPossibleVendor) {

                matches.push({

                vendor: vendor,
                completion: vendor.substring(vendor_search.length, vendor.length)

                });

            }

        });

        if(matches.length > 0) {

          assignMatches(sortMatches(matches));

        }

    }

    const filterVendors = (input) => {

        const parts = input.split('@');

        if(input.includes('@') && parts[1].length > 0){

          computeMatches(parts[1]);

        }

    }

    const mapCSS = (key) => {

        if(!props.css) {

            return null;

        }

        return key.split(".").reduce(function(o, x) {

            return (typeof o == "undefined" || o === null) ? o : o[x];

        }, props.css)

    }

    // Lifecycle Hooks

    useEffect(() => {

        const outsideComponentClick = (e, ref) => {

            if(e.target instanceof HTMLElement && ref.current !== null && !ref.current.contains(e.target)) {

              setOverlayVisible(false);

            }

        }

        document.addEventListener('click', (e) => outsideComponentClick(e, autoCompleteWrapperRef));

        return () => {
            document.removeEventListener('click', (e) => outsideComponentClick(e, autoCompleteWrapperRef));
        };

    }, [ref]);

    return (
        <div ref={autoCompleteWrapperRef}>
            {props.children}
            <div className="auto-complete-container" style={mapCSS("container")}>
                {overlayVisible && matches.length > 0 ?
                <div className="auto-complete-overlay" style={mapCSS("overlay")}>
                    <ul>
                        {matches.map((match, index) => (
                            <li
                                key={index}
                                onClick={() => completeInput(inputVal + match.completion)}
                                className={index === selectedMatch ? "selected" : ""}
                                style={mapCSS("text.suggestion")}
                            >
                                <span

                                >{inputVal}</span>
                                <span
                                    className="completion"
                                    value={match.completion}
                                >{match.completion}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                : null}
            </div>
        </div>
    );
});

// Props
EmailAutoComplete.defaultProps = {

}

export default EmailAutoComplete;
