import React, { useRef, useState, useEffect } from 'react'; 
import gsap from 'gsap'; 
import { Link } from 'react-router-dom'; 

function Nav() { 

    //useRef 
    const pageWidthAnim = useRef(null); 
    const navWidthAnim = useRef(null); 
    const backgroundNavAnim = useRef(null); 

    //useState 
    const [navDisplay, setNavDisplay] = useState("none"); 
    const [scrollState, setScrollState] = useState(""); 

    //window size 
    const size = useWindowSize();

    function useWindowSize() {
        const [windowSize, setWindowSize] = useState({
            width: undefined,
            height: undefined,
        });
        
        useEffect(() => {
            // Handler to call on window resize
            function handleResize() {
            // Set window width/height to state
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
            }

            // Add event listener
            window.addEventListener("resize", handleResize);
            
            // Call handler right away so state gets updated with initial window size
            handleResize();
            
            // Remove event listener on cleanup
            return () => window.removeEventListener("resize", handleResize);
        }, []); // Empty array ensures that effect is only run on mount
        
        return windowSize;
    }

    //functions 
    const handleNavOpen = () => {
        setNavDisplay("flex"); 

        if (size.width < 768) {
            gsap.to(pageWidthAnim.current, {marginRight: "100vw"}); 
            gsap.fromTo(navWidthAnim.current, {width: "0px", right: "0%"}, {width: "55vw", right: "0%", backgroundColor: "rgb(15, 15, 15)", display: "flex", flexDirection: "column"});
        }

        else if (size.width < 1024) {
            gsap.to(pageWidthAnim.current, {marginRight: "80vw"}); 
            gsap.fromTo(navWidthAnim.current, {width: "0px", right: "0%"}, {width: "40vw", right: "0%", backgroundColor: "rgb(15, 15, 15)", display: "flex", flexDirection: "column"});
        }

        else if (size.width < 1440) {
            gsap.to(pageWidthAnim.current, {marginRight: "60vw"}); 
            gsap.fromTo(navWidthAnim.current, {width: "0px", right: "0%"}, {width: "30vw", right: "0%", backgroundColor: "rgb(15, 15, 15)", display: "flex", flexDirection: "column"});
        }

        else if (size.width < 1850) {
            gsap.to(pageWidthAnim.current, {marginRight: "40vw"}); 
            gsap.fromTo(navWidthAnim.current, {width: "0px", right: "0%"}, {width: "20vw", right: "0%", backgroundColor: "rgb(15, 15, 15)", display: "flex", flexDirection: "column"});
        }

        else if (size.width >= 1850) {
            gsap.to(pageWidthAnim.current, {marginRight: "30vw"}); 
            gsap.fromTo(navWidthAnim.current, {width: "0px", right: "0%"}, {width: "15vw", right: "0%", backgroundColor: "rgb(15, 15, 15)", display: "flex", flexDirection: "column"});
        }
        
        gsap.fromTo(backgroundNavAnim.current, {width: "100vw", height: "100vh"}, {display: "flex", backgroundColor: "rgba(0, 0, 0, 0.75)", width: "100vw", height: "100vh", position: "fixed", opacity: 1, zIndex: 999}); 
        setScrollState("hidden"); 
    }
    
    const handleNavClose = () => {
        setNavDisplay("none")
        gsap.to(pageWidthAnim.current, {marginRight: "0px"}); 
        gsap.to(navWidthAnim.current, {width: "0px"}); 
        gsap.to(backgroundNavAnim.current, {opacity: 0, display: "none"}); 
        setScrollState("unset"); 
    }

    return (
        <div className="open-up-nav" ref={navWidthAnim}>
            <div className="x-nav" style={{display: navDisplay}}>
                <img alt="" onClick={handleNavClose} src="https://upload.wikimedia.org/wikipedia/en/thumb/6/61/Cross_icon_%28white%29.svg/1024px-Cross_icon_%28white%29.svg.png" />
            </div>
            <div className="column-nav-inside">
                <div className="column-nav-item-pink" style={{display: navDisplay, backgroundColor: 'rgb(35, 35, 35)'}}>
                    <Link to="/Soccer-Way">
                        <pre>
                            Home 
                        </pre>
                </Link>
                </div>
                <div className="column-nav-item" style={{display: navDisplay}}>
                    <Link to="/Soccer-Way/team-search">
                        <pre>
                            Search for a Team
                        </pre>
                    </Link>
                </div>
                <div className="column-nav-item" style={{display: navDisplay}}>
                    <Link to="/Soccer-Way/select-date-page">
                        <pre>    
                            Matches {/*(get date and search games that happenecd that date)*/}
                        </pre>
                    </Link>
                </div>
                <div className="column-nav-item" style={{display: navDisplay}}>
                    <Link to="/Soccer-Way/find-league-page">
                        <pre>
                            Find a League {/* http get competitions/leagues and with that compeition ID and http get competition fixtures */}
                        </pre>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Nav