/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {

    // Testing the suite of RSS Feeds
    describe('RSS Feeds', function() {
        // to make sure allFeeds are defined, not empty
        it('are defined', function() {
            //checks if allFeeds variables are defined
            expect(allFeeds).toBeDefined();
            //checks if allFeeds length is not empty
            expect(allFeeds.length).not.toBe(0);
        });

        //to make sure allFeeds have URL that starts with "http(s)://"
        it("have URLs and not empty", function() {
            allFeeds.forEach(function(feed) {
                //checks if URL is defined
                expect(feed.url).toBeDefined();
                //checks if URL is not empty
                expect(feed.url.length).not.toBe(0);
            });
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        //to make sure allFeeds have names
        it('have Names and not empty', function() {
            allFeeds.forEach(function(feed) {
                //checks if name is defined
                expect(feed.name).toBeDefined();
                //checks if name is not an empty string
                expect(feed.name).not.toBe('');
            });
        });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('The menu element is by default hidden', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });


        /* TODO: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('The menu changes visibility when clicked on menu icon', function() {
            //defines variable to be checked when clicked
            var visibilityCheck = $('.menu-icon-link');
            //checks if menu-hidden is false when clicked the first time
            visibilityCheck.click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            //checks if menu-hidden is true when clicked the second time
            visibilityCheck.click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });
    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        //calls the loadfeed() function feed & uses done() as argument for beforeEach()
        beforeEach(function(done) {
            loadFeed(0, done);
        });
        it('Has at least one .entry element within the .feed container', function(done) {
            //defines the entries to be checked
            var entries = $(".feed .entry");
            //expects that there is at least one entry
            expect(entries.length).toBeGreaterThan(0);
            done();
        });
    });


    // TODO: Write a new test suite named "New Feed Selection"
    describe('New Feed Selection', function() {
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        var oldUrl;
        var formattedUrl;

        beforeEach(function(done) {
            // checks the previous Url for the entry-link
            loadFeed(0, function() {
                oldUrl = document.querySelector(".feed").innerHTML;
                loadFeed(1, function() {
                    done();
                });
            });
        });

        // To make sure when new feed is loaded using loadFeed function, the content changes
        it('When a new feed is loaded by loadFeed function the content is changed', function(done) {
            // Checks that Formatted Url does not match with the Old feed
            formattedUrl = document.querySelector(".feed").innerHTML;
            expect(formattedUrl).not.toBe(oldUrl);
            done();
        });
    })
}());