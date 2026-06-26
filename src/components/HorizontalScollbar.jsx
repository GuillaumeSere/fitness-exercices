import React, { useEffect, useMemo, useRef, useState } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box, IconButton } from '@mui/material';
import BodyPart from './BodyPart';
import ExerciseCard from './ExerciseCard';

const HorizontalScollbar = ({
  data = [],
  bodyPart,
  setBodyPart,
  isBodyParts,
  cardVariant = 'default',
  ariaLabel = 'Carrousel',
}) => {
  const scrollRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = isBodyParts ? data.length || 1 : 5;
  const totalPages = Math.max(1, Math.ceil(data.length / itemsPerPage));
  const visibleItems = useMemo(() => {
    if (isBodyParts) {
      return data;
    }

    const start = currentPage * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
  }, [currentPage, data, isBodyParts, itemsPerPage]);
  const scrollbarClassName = isBodyParts
    ? 'horizontal-scrollbar horizontal-scrollbar--filters'
    : `horizontal-scrollbar horizontal-scrollbar--exercises horizontal-scrollbar--${cardVariant}`;

  const scroll = (direction) => {
    if (!isBodyParts) {
      setCurrentPage((page) => {
        if (direction === 'previous') {
          return page === 0 ? totalPages - 1 : page - 1;
        }

        return page === totalPages - 1 ? 0 : page + 1;
      });
      return;
    }

    const container = scrollRef.current;

    if (!container) {
      return;
    }

    container.scrollBy({
      left: direction === 'previous' ? -container.clientWidth * 0.85 : container.clientWidth * 0.85,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    setCurrentPage(0);
  }, [data]);

  return (
    <Box
      className={scrollbarClassName}
      role="region"
      aria-label={ariaLabel}
      aria-roledescription="carrousel"
    >
      <Box className="react-horizontal-scrolling-menu--wrapper">
        <IconButton
          type="button"
          className="carousel-button carousel-button--inside carousel-button--previous"
          aria-label="Afficher les éléments précédents"
          onClick={() => scroll('previous')}
        >
          <ChevronLeftIcon />
        </IconButton>

        <Box
          ref={scrollRef}
          className="react-horizontal-scrolling-menu--scroll-container"
        >
          {visibleItems.map((item) => (
            <Box
              className="react-horizontal-scrolling-menu--item"
              key={item.id || item}
              m={{ xs: '0 8px', sm: '0 10px' }}
            >
              {isBodyParts ? (
                <BodyPart item={item} bodyPart={bodyPart} setBodyPart={setBodyPart} />
              ) : (
                <ExerciseCard exercise={item} variant={cardVariant} />
              )}
            </Box>
          ))}
        </Box>

        <IconButton
          type="button"
          className="carousel-button carousel-button--inside carousel-button--next"
          aria-label="Afficher les éléments suivants"
          onClick={() => scroll('next')}
        >
          <ChevronRightIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default HorizontalScollbar;
