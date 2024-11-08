const combine_class = (...classes: (string | any)[]) => {
    return classes.filter(Boolean).join(' ');
}

export default combine_class;
