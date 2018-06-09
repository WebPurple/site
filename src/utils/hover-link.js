export default color => `
    position: relative;
    display: inline-block;
    
    &:hover {
        color: ${color}; 
    }
    
    &:after {
        width: 0;
        height: 0.2rem;
        display: block;
        position: absolute;
        left: 50%;
        content: '';
        background: ${color};
        transition: all 0.2s ease-in-out;
    }

    &:hover:after {
        left: 0;
        width: 100%;
    }
`
