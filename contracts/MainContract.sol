pragma solidity ^0.5.0;

contract MainContract {
	
	// Review storage struct
	struct Review {
        address reviewer;
        address company;
        string review;
        uint rating;
    }

    // Review structs are mapped to hash values
    mapping(string => Review) private reviews;
    string[] public hashes;

    // Function to insert a review in mapping
    function newReview(string memory reviewHash, address userAddress, address c, string memory rev, uint rate) public
    {
        hashes.push(reviewHash);
        reviews[reviewHash].reviewer = userAddress;
        reviews[reviewHash].company = c;
        reviews[reviewHash].review = rev;
        reviews[reviewHash].rating = rate;

    }
     
    // Function to return count of reviews
    function getReviewCount() public view returns(uint)
    {
        return hashes.length;
    }

    function getReviewHash(uint num) public view returns(string memory)
    {
        return hashes[num];
    }

    // Function to get reviewer rating
    function getReviewRating(string memory reviewHash) public view returns(uint)
    {
        return reviews[reviewHash].rating;
    }

    // Function to get review creator
    function getReviewCreator(string memory reviewHash) public view returns(address)
    {
        return reviews[reviewHash].reviewer;
    }

    // Function to get review body
    function getReviewBody(string memory reviewHash) public view returns(string memory)
    {
        return reviews[reviewHash].review;
    }

    // Function get company hash of review
    function getReviewCompany(string memory reviewHash) public view returns(address)
    {
        return reviews[reviewHash].company;
    }

}