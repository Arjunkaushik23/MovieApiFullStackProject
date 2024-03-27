import React, { useEffect, useRef } from "react";
import api from '../../api/axiosConfig';
import { useParams } from 'react-router-dom';
import { Row, Col, Container } from 'react-bootstrap';
import ReviewForm from "../reviewForm/ReviewForm";

const Reviews = ({ getMovieData, movie, review, setReviews }) => {
    const revText = useRef();
    const params = useParams();
    const movieId = params.movieId;

    useEffect(() => {
        getMovieData(movieId);
    }, []);

    const addReview = async (e) => {
        e.preventDefault();

        const rev = revText.current;

        try {
            const response = await api.post("/api/v1/reviews", { reviewBody: rev.value, imdbId: movieId });
            const updateReview = [...review, { body: rev.value }]; // Use 'review' instead of 'reviews'

            rev.value = "";
            setReviews(updateReview);
        } catch (err) {
            console.log(err);
            // Handle error appropriately, e.g., show an error message to the user
        }
    }

    return (
        <Container>
            <Row>
                <Col><h3>Reviews</h3></Col>
            </Row>
            <Row className="mt-2">
                <Col>
                    <img src={movie?.poster} alt="" />
                </Col>
                <Col>
                    <>
                        <Row>
                            <Col>
                                <ReviewForm handleSubmit={addReview} revText={revText} lableText="Write a Review?" />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <hr />
                            </Col>
                        </Row>
                    </>
                    {
                        review?.map((r, index) => ( // Use 'review' instead of 'reviews'
                            <div key={index}>
                                <Row>
                                    <Col>{r.body}</Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <hr />
                                    </Col>
                                </Row>
                            </div>
                        ))
                    }
                </Col>
            </Row>
            <Row>
                <Col>
                    <hr />
                </Col>
            </Row>
        </Container>
    );
}

export default Reviews;
