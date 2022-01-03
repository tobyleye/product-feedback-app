const Button = {
  baseStyle: {
    border: "none",
    fontWeight: "bold",
    borderRadius: "10px",
    fontFamily: "Jost, sans-serif",
    color: "#fff",
    bg: "var(--bg)",
    _hover: {
      color: "#F2F4FE",
      
    },
    _focus:{
      outline:'none',
      boxShadow: 'none'
    },
    _disabled: {
      color: "#F2F4FE",
    },
  },

  sizes: {
    md: {
      fontSize: "sm",
      px: 6,
      py: 5,
    },
  },

  variants: {
    purple: {
      bg: "purple.1",
      _hover: {
        bg: "purple.fade",
        _disabled: {
          bg: "purple.fade",
        },
      },
    },
    blue: {
      bg: "blue.1",
      _hover: {
        bg: "blue.fade",
        _disabled: {
          bg: "blue.fade",
        },
      },
    },
    gray: {
      bg: "gray.5",
      _hover: {
        bg: "gray.fade",
        _disabled: {
          bg: "gray.fade",
        },
      },
    },
    red: {
      bg: "red.1",
      _hover: {
        bg: "red.fade",
        _disabled: {
          bg: "red.fade",
        },
      },
    },

    interactive: {
      bg:'gray.1',
      color:'blue.1',
      fontSize: "13px",
      px:"10px",
      py:"8px",
      _hover: {
        bg:'#CFD7FF',
        color:'blue.1',
        _disabled:{
          bg:'#CFD7FF',
          color:'blue.1',
        }
      }
    }
  },

  defaultProps: {
    size: "md",
    variant: "purple",
  },
};

export default Button;
