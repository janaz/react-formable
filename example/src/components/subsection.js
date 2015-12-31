/*eslint func-style:0*/
import React, { PropTypes } from 'react';
import MD  from './md';

export default function Subsection(props) {
    const {
        title='',
        markdown='',
        link,
        subSections=[],
        code: Code
    } = props;

    const [firstMD, ...restMD] = markdown
                                    .split('{{code}}')
                                    .map((m, i) => <MD text={m} key={i} />);
    const content = Code ?
        [firstMD, <Code key="code" />, ...restMD] :
        [firstMD, ...restMD];

    return <div id={link} className="subsection">
        {title && title.length && <h2>{title}</h2>}

        {content}

        {subSections.map((subSection) => {
            return <Subsection key={subSection.link} {...subSection} />;
        })}
    </div>;
}

Subsection.propTypes = {
    title: PropTypes.string,
    id: PropTypes.string,
    link: PropTypes.string,
    markdown: PropTypes.string,
    code: PropTypes.func,
    subSections: PropTypes.array
};
