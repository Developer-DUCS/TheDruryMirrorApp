insert into users(fname,lname,email,password,roles,created,active) values
('Elon','Musk','emusk@drury.edu','spacex','Writer', NOW(),'1'),
('Nikola','Tesla','ntesla@drury.edu','telsaCoil','Writer', NOW(),'1'),
('Alan','Turing','aturing@drury.edu','turingMachine','Writer', NOW(),'1'),
('Jeff','Bezos','jbezos@drury.edu','amazon','Writer', NOW(),'1'),
('Jack','Dorsey','jdorsey@drury.edu','twitter','Copy-Editor', NOW(),'1'),
('Mark','Zuckerberg','mzuckerberg@drury.edu','facebook','Copy-Editor', NOW(),'1'),
('Tim','Cook','tcook@drury.edu','apple','Editor-In-Chief', NOW(),'1'),
('Greg','Booker','advisor@drury.edu','advisor','Manager', NOW(),'1');

-- isDraft: 0: Unfinished, 1: Draft (ready to be edited), 2: Edited (sent back to the author), 
--          3: Fixed (sent to editor again), 4: Ready to publish (send to Editor-In-Chief), 5: Publish
insert into articles(email,author,headline,body,isDraft,createdDate) values
(
'emusk@drury.edu',
'Elon Musk', 
'Spacex: Poineering Space Travel',
'<p>When I founded SpaceX in 2002, my goal was to revolutionize the space industry and make life multi-planetary. I believed that humanity needed to become a multi-planetary species in order to ensure our survival and thrive in the future. Over the years, SpaceX has become much more than just a company to me. Its become a passion and a mission that Im deeply committed to.</p>
<p>One of the things that sets SpaceX apart from other space companies is our focus on innovation and reusability. From the beginning, we knew that we needed to find a way to reduce the cost of space travel in order to make it accessible to more people. Thats why we developed our reusable rockets, which have already revolutionized the industry and made space travel more affordable and sustainable.</p>
<p>Another thing that sets SpaceX apart is our willingness to take on big challenges. We do not shy away from difficult projects; in fact, we embrace them. For example, our plan to establish a human settlement on Mars is a monumental challenge, but its one that we believe is worth pursuing. Its going to take a lot of hard work and dedication, but we are committed to making it happen.</p>
<p>At SpaceX, we are also committed to advancing the field of space exploration and pushing the boundaries of what is possible. That is why we have developed the Dragon spacecraft, which is capable of both transporting cargo and crew to the International Space Station and performing autonomous landings back on Earth. We are also working on the Starship spacecraft, which will be capable of transporting both humans and cargo to Mars and other destinations in the solar system.</p>
<p>Overall, I am incredibly proud of what SpaceX has accomplished over the years. We have come a long way since our early days, and we are just getting started. Our mission is to make life multi-planetary, and we are committed to making that a reality. I truly believe that we are on the cusp of a new era in space exploration, and I can not wait to see what the future holds for SpaceX and for humanity.</p>',
'1',
NOW()
),
(
'emusk@drury.edu',
'Elon Musk',
'Introducing the Cyber Truck',
'<p>Elon Musk is no stranger to taking risks and disrupting industries. He has done it time and time again with SpaceX, Tesla, and more recently, The Boring Company. One of the latest innovations to come out of Tesla is the Cybertruck, a highly anticipated electric pickup truck that promises to change the way people think about trucks.</p>
<p>The Cybertruck was unveiled by Tesla in 2019 to much fanfare. Its design was immediately polarizing, with some people loving its futuristic, angular look and others criticizing it for being too unconventional. However, Elon Musk is not one to shy away from controversy, and he fully stands behind the Cybertrucks design.</p>
<p>In a tweet from November 2019, Musk wrote, and quot;Cybertruck is our best product ever. We are saving lives with it. If we did not make Cybertruck, then I think we would be running a big risk.&quot;</p>
<p>Musk is referring to the Cybertrucks durability and safety features. The trucks body is made of ultra-hard 30X cold-rolled stainless steel and armored glass, making it virtually impenetrable. The truck also boasts features like advanced airbags and Teslas Autopilot system, which can help prevent accidents before they happen.</p>
<p>But the Cybertruck is not just about safety and durability. It is also a highly capable truck that can tow up to 14,000 pounds and haul up to 3,500 pounds. And because it is electric, it is also incredibly efficient and environmentally friendly. According to Tesla, the Cybertruck will have a range of up to 500 miles on a single charge.</p>
<p>Of course, the Cybertrucks design is still a major talking point. Musk has said that the trucks angular, futuristic look was inspired by the Lotus Esprit submarine car from the James Bond movie &quot;The Spy Who Loved Me.&quot; The Cybertrucks unconventional design is part of what makes it so unique, and Musk believes that people will come around to it once they see it in person.</p>
<p>In fact, Musk has said that the demand for the Cybertruck has exceeded his expectations. In a tweet from May 2020, he wrote, &quot;200k.&quot; This was in reference to the number of pre-orders that Tesla had received for the Cybertruck in just a few days after its unveiling. The demand for the truck has only continued to grow since then.</p>
<p>The Cybertruck is set to go into production in 2022, and it is clear that Elon Musk is betting big on its success. He has said that the truck will be a game-changer for the automotive industry, and that it will help accelerate the transition to sustainable energy.</p>
<p>In an interview with Joe Rogan in 2019, Musk said, &quot;If there is only a small number of people that like the truck, I guess we will make a more conventional truck in the future. But it is gotta be something that is gonna get people excited.&quot;</p>
<p>It is safe to say that the Cybertruck has gotten people excited. Whether you love it or hate it, there is no denying that it is a highly innovative and unique vehicle that is pushing the boundaries of what is possible in the automotive industry. And with Elon Musk at the helm, it is clear that Tesla is not afraid to take risks and disrupt the status quo.</p>',
'4',
NOW()
),
(
'ntesla@drury.edu',
'Nikola Tesla', 
'The Creation of the Tesla Coil',
'<p>It was a moment of pure genius. As I sat in my laboratory in Colorado Springs, I had a breakthrough that would change the course of electrical engineering forever. The creation of the Tesla coil was a culmination of years of hard work and experimentation, and it was a device that would bring the world closer to understanding the mysteries of electricity.</p>
<p>I had been working on wireless power transmission for years, and I knew that I was close to a breakthrough. But it wasnt until I began experimenting with high-frequency alternating currents that I realized the full potential of my research. The Tesla coil was born from these experiments, and it was a device that would transform the way we think about electricity.</p>
<p>At its core, the Tesla coil is a resonant transformer that uses high-frequency alternating current to produce high-voltage, low-current electricity. It works by creating a series of electrical discharges between two coils, with the resulting spark being used to charge a capacitor. This process repeats itself over and over, creating a steady stream of high-voltage electricity that can be used for a variety of purposes.</p>
<p>As I watched the Tesla coil in action, I knew that I had created something truly revolutionary. It was a device that could produce high-voltage electricity without the need for wires, and it was a device that could be used for everything from wireless power transmission to radio transmission.</p>
<p>But the Tesla coil was more than just a practical invention. It was a device that captured the imagination of people around the world, and it was a device that demonstrated the power of electricity in a way that had never been seen before. It was a device that would inspire generations of electrical engineers, and it was a device that would cement my place in history as one of the greatest inventors of all time.</p>
<p>Looking back on that moment now, I am filled with pride and gratitude for the opportunity to have made such a significant contribution to the field of electrical engineering. The creation of the Tesla coil was a moment of pure inspiration, and it was a moment that changed the world forever.</p>',
'1',
NOW()
),
(
'aturing@drury.edu',
'Alan Turing', 
'Cracking Enigma Machine',
'<p>Breaking the Enigma machine was one of the most challenging and rewarding experiences of my life. As a mathematician and computer scientist, I knew that the key to defeating the machine was to develop a method for deciphering its complex code. It was a daunting task, but I was determined to succeed.</p>
<p>At the heart of the Enigma machine was a complex system of rotors and wires that encrypted messages in a way that seemed impenetrable. However, I knew that with the right approach, it could be broken. I gathered a team of skilled cryptanalysts and set to work, developing a code-breaking machine that we called the Bombe.</p>
<p>The Bombe was a marvel of engineering, capable of analyzing thousands of possible code combinations in just a matter of hours. We worked tirelessly, testing and refining the machine until it was able to crack the code and decipher German messages with remarkable accuracy.</p>
<p>But the road to breaking the Enigma machine was not without its challenges. We faced a constant battle to keep up with the ever-changing code, as the Germans continued to make adjustments to their encryption system in an effort to stay ahead of us. We also had to contend with the immense pressure of the war effort, as the Allied forces relied on us to provide critical intelligence that could turn the tide of the conflict.</p>
<p>Despite these challenges, we persevered, and our efforts paid off in ways that we never could have imagined. The intelligence we gained from breaking the Enigma machine helped to shorten the war and save countless lives. It also paved the way for the development of modern cryptography, which has revolutionized the way we communicate and do business.</p>
<p>Looking back on that time, I am humbled and grateful for the opportunity to have played a part in such a critical moment in history. Breaking the Enigma machine was not just a technical achievement; it was a turning point in the war and a testament to the power of human ingenuity and determination. I am proud to have been a part of it, and I will always be grateful for the chance to make a difference in the world.</p>',
'1',
NOW()
),
(
'jbezos@drury,.edu',
'Jeff Bezos',
'Shopping Reimaged',
'<p>When I founded Amazon in 1994, I had a simple vision: to create an online marketplace where customers could find and purchase anything they wanted, quickly and easily. I believed that the internet had the potential to revolutionize the way we shop, and I was committed to making that vision a reality.</p>
<p>Over the years, Amazon has grown and evolved in ways that I never could have imagined. We have expanded our product offerings to include everything from books and music to clothing and electronics. We have also developed innovative technologies like Alexa and AWS that have transformed the way we interact with the world around us.</p>
<p>But at the heart of Amazons success is our relentless focus on the customer. From day one, we have been committed to providing the best possible shopping experience for our customers, and that is something that we have never lost sight of. We are constantly striving to innovate and improve our products and services, all with the goal of making our customers lives easier and more convenient.</p>
<p>Another key to our success is our willingness to take risks and embrace change. We are not afraid to try new things, and we are always looking for ways to push the envelope and stay ahead of the curve. This has led to some of our most successful innovations, like Amazon Prime, which has transformed the way we think about shipping and delivery.</p>
<p>Of course, none of this would be possible without the incredible team of people that make up Amazon. We are fortunate to have some of the most talented and dedicated employees in the world, and I am constantly impressed by their ingenuity and creativity. It is their hard work and passion that have driven our success and allowed us to accomplish so much in such a short amount of time.</p>
<p>Looking ahead, I am excited about the future of Amazon and the role that we can play in shaping the world around us. We are constantly exploring new opportunities and pushing the boundaries of what is possible, all with the goal of making our customers lives better. I am proud of what we have accomplished so far, but I know that the best is yet to come.</p>',
'1',
NOW()
),
(
'jdorsey@drury.edu',
'Jack Dorsey',
'Tweeting and Retweeting all the Tweets',
'<p>When I co-founded Twitter in 2006, I had a simple vision: to create a platform where people could connect, communicate, and share their thoughts and ideas with the world. I believed that the power of social media could bring people together in new and meaningful ways, and I was determined to make that vision a reality.</p>
<p>Over the years, Twitter has evolved and grown in ways that I never could have imagined. Today, it is become one of the most influential and widely-used social media platforms in the world, with millions of users from all walks of life.</p>
<p>One of the things that sets Twitter apart from other social media platforms is its simplicity. We have always believed in the power of brevity, and our 280-character limit has become one of the defining features of our platform. It is a testament to the power of words and the ability of individuals to express themselves in concise and impactful ways.</p>
<p>Another key to our success is our commitment to free speech and open dialogue. We believe that everyone should have the right to express their opinions and share their ideas, no matter how controversial or unpopular they may be. This has made Twitter a powerful tool for social and political movements, allowing people to come together and speak out on issues that matter to them.</p>
<p>Of course, there have been challenges along the way. We have had to deal with issues like harassment and fake news, and we are constantly working to improve our platform and make it a safer and more responsible space for all users.</p>
<p>Looking ahead, I am excited about the future of Twitter and the role that we can play in shaping the world. We are constantly exploring new ways to connect people and facilitate conversation, all with the goal of making the world a better and more connected place. I am proud of what we have accomplished so far, but I know that there is still so much more that we can do. Together, I believe that we can create a world where everyone has a voice and everyone can be heard.</p>',
'1',
NOW()
),
(
'mzuckerberg@drury.edu',
'Mark Zuckerberg',
'Facebooks Next Update',
'<p>Dear Facebook Community,</p>
<p>I am excited to announce our latest update to the platform, which we believe will help to make Facebook an even more engaging and valuable space for all users.</p>
<p>One of the key focuses of this update is to promote meaningful connections and conversation. We have developed new tools that will help you to discover and engage with content that is relevant to your interests and passions, whether it is from friends, family, or other communities.</p>
<p>We have also been working hard to improve the quality and accuracy of the content on our platform. This means using advanced algorithms to filter out fake news and other forms of harmful content, as well as partnering with third-party fact-checkers to ensure that the information you see on Facebook is reliable and trustworthy.</p>
<p>Another key feature of our update is an enhanced focus on privacy and control. We believe that everyone should have the ability to control their own data and privacy, which is why we have made it easier than ever to manage your settings and control what information you share with others.</p>
<p>We have also introduced new features that will make it easier to connect with people and build communities on Facebook. Whether you are looking for a new group to join or want to start your own, we have made it simple and intuitive to find and connect with like-minded individuals.</p>
<p>Finally, we have made significant improvements to the overall user experience of Facebook, with faster load times and a more streamlined design that is easier to navigate and use.</p>
<p>I am incredibly excited about this latest update and the ways in which it will help to make Facebook a more engaging, meaningful, and valuable space for everyone in our community. We are constantly working to improve our platform and provide the best possible experience for our users, and I am confident that this latest update is a significant step in that direction.</p>
<p>Thank you for being a part of the Facebook community, and I look forward to continuing to work together to build a better and more connected world.</p>
<p>Sincerely, Mark Zuckerberg</p>',
'1',
NOW()
),
(
'mzuckerberg@drury.edu',
'Mark Zuckerberg',
'The Meta Verse',
'<p>Mark Zuckerberg, CEO of Facebook, recently announced that the future of the internet lies in the Metaverse. In a Facebook post from July 2021, Zuckerberg described the Metaverse as &quot;a virtual environment where you can be present with people in a digital space. It is an embodied internet that you are inside of, rather than just looking at.&quot;</p>
<p>The idea of the Metaverse has been around for decades, popularized by science fiction works such as Neal Stephensons &quot;Snow Crash&quot; and Ernest Clines &quot;Ready Player One.&quot; But Zuckerbergs vision is to make it a reality, and he believes that Facebook is uniquely positioned to do so.</p>
<p>In a recent interview with The Verge, Zuckerberg explained that the Metaverse will be a successor to the mobile internet, and that it will be an entirely new platform. &quot;We think of this as a really big part of the next chapter for the internet,&quot; he said.</p>
<p>But what exactly will the Metaverse look like? Zuckerberg envisions a world where people can work, learn, play, and socialize in a completely virtual environment. He sees it as a way to connect people across distances and time zones, and to break down barriers of physical location and ability.</p>
<p>Zuckerberg has also emphasized that the Metaverse will be an open platform, not controlled by any one company or government. &quot;This is not about us building a thing and everyone else using it,&quot; he said. &quot;It needs to be something that is built in a decentralized way, where people can create their own spaces.&quot;</p>
<p>Of course, there are concerns about the potential drawbacks of the Metaverse. Some worry about the impact on mental health, as people may become even more disconnected from reality. Others are concerned about the potential for abuse, such as harassment or cyberbullying.</p>
<p>Zuckerberg has acknowledged these concerns and has said that the Metaverse will need to be designed with safety and privacy in mind. &quot;We need to make sure that people can feel comfortable being their authentic selves,&quot; he said. &quot;And we need to make sure that people can feel safe.&quot;</p>
<p>The Metaverse is still in its early stages, and there is much work to be done before it becomes a reality. But Zuckerberg is optimistic about its potential, and he believes that it could be the key to unlocking new levels of human connection and creativity.</p>
<p>&quot;The Metaverse is going to be an extension of the internet,&quot; he said. &quot;Its going to be the next generation of the internet, and it is going to enable us to do things that we cannot even imagine today.&quot;</p>',
'5',
NOW()
),
(
'tcook@drury.edu',
'Tim Cook',
'Introducing Apples Next Update',
'<p>Dear Apple community,</p>
<p>I am thrilled to announce our latest update to the Apple ecosystem, which we believe will enhance your experience and make your devices even more powerful and intuitive.</p>
<p>At Apple, our mission has always been to create products that empower people to do more, to be more creative, and to connect more deeply with the world around them. With this latest update, we have focused on making our devices even more accessible, secure, and capable.</p>
<p>One of the key features of this update is an enhanced focus on privacy and security. We know that our users value their privacy and are concerned about the security of their personal information. That is why we have introduced new tools and features that will make it easier than ever to protect your data and control who has access to it.</p>
<p>We have also worked hard to make our devices more accessible and inclusive. From new voice commands and visual cues to a more customizable interface, we have made it easier for everyone to use and enjoy our products, regardless of their abilities or background.</p>
<p>In addition, we have introduced a range of new features and tools that will make it easier to get things done and stay connected. From new productivity tools to enhanced video conferencing and messaging capabilities, we are constantly striving to make our devices even more versatile and useful.</p>
<p>Finally, we have made significant improvements to the performance and battery life of our devices, ensuring that you can rely on your Apple products to stay connected and productive throughout the day.</p>
<p>I am incredibly excited about this latest update and the ways in which it will enhance your experience and empower you to do more. At Apple, we are committed to delivering the best possible user experience, and I am confident that this latest update is a significant step in that direction.</p>
<p>Thank you for being a part of the Apple community, and I look forward to continuing to innovate and improve our products to meet your needs and exceed your expectations.</p>
<p>Sincerely, Tim Cook</p>',
'1',
NOW()
),
(
'tcook@drury.edu',
'Tim Cook',
'The Newest iPhone',
'<p>As the world continues to become increasingly interconnected, the importance of reliable and versatile technology has become more important than ever. And that is why I am thrilled to introduce the iPhone 17, our latest innovation that continues to push the boundaries of what a smartphone can do.</p>
<p>At Apple, we pride ourselves on creating products that are not only beautiful and intuitive, but also impactful and useful in peoples lives. And with the iPhone 17, we are taking that commitment to the next level.</p>
<p>So what can you expect from the iPhone 17? For starters, it boasts a stunning 7-inch OLED display that is capable of displaying vivid, true-to-life colors. The display is also equipped with a brand new technology that makes it more resistant to scratches and cracks, ensuring that your phone will look great for years to come.</p>
<p>But it is not just the display that is impressive. The iPhone 17 features a powerful A19 chip that makes it faster and more efficient than any iPhone before it. With this new chip, you can expect lightning-fast app load times, seamless multitasking, and a longer battery life than ever before.</p>
<p>We have also made significant improvements to the camera system on the iPhone 17. With a new 108-megapixel rear camera, you can capture stunning photos and videos that rival those of professional cameras. And with a new ultra-wide lens and improved image stabilization, you can capture even more detail and clarity in your shots.</p>
<p>But the iPhone 17 is more than just a collection of impressive hardware features. We have also invested heavily in software and services that make it easier than ever to stay connected with the people and things that matter most to you. With our latest version of iOS, you will have access to a range of new features that make your phone more intuitive and personalized, from improved Siri functionality to new tools for managing your notifications.</p>
<p>At Apple, we believe that technology should serve humanity, not the other way around. And with the iPhone 17, we are continuing to build products that are designed to make your life easier and more enjoyable. We cannot wait for you to experience it for yourself.</p>',
'5',
NOW()
)