package edu.sjsu.cmpe275.aop.tweet.aspect;

import edu.sjsu.cmpe275.aop.tweet.TweetStatsServiceImpl;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;


@Aspect
@Order(2) // Order means in what order aspect will be processed if more than one aspect applied to the same join point        https://howtodoinjava.com/spring-aop/spring-aop-specifying-aspects-ordering/
public class ValidationAspect {
  /***
   * Following is a dummy implementation of this aspect.
   * You are expected to provide an actual implementation based on the requirements, including adding/removing advices as needed.
   */

  // The before advices will happen before the actual method, we do all validation things here and if any error is thrown here, we have written that in Retry aspect to catch that.

  @Autowired
  TweetStatsServiceImpl stats;

  @Before("execution(public void edu.sjsu.cmpe275.aop.tweet.TweetService.tweet(..))")
  public void dummyBeforeAdvice(JoinPoint joinPoint) throws IllegalArgumentException {
    System.out.printf("Prior to the execution of method %s in Validation Aspect\n", joinPoint.getSignature().getName());

    try {

      if(joinPoint.getArgs()[0] == null || joinPoint.getArgs()[0].toString().length() == 0)
        throw new IllegalArgumentException();

      if(joinPoint.getArgs()[1] == null || joinPoint.getArgs()[1].toString().length() == 0)
        throw new IllegalArgumentException();

      if(joinPoint.getArgs()[1] == null || joinPoint.getArgs()[1].toString().length() > 140)
        throw new IllegalArgumentException();

    }catch(IllegalArgumentException e) {
      e.printStackTrace();
      System.out.printf("Aborted the executuion of the method %s in validationAspect\n", joinPoint.getSignature().getName());
      throw e;
    }
  }

  @Before("execution(public void edu.sjsu.cmpe275.aop.tweet.TweetService.block(..))")
  public void beforeBlock(JoinPoint joinPoint) throws IllegalArgumentException, UnsupportedOperationException {
    System.out.printf("Prior to the execution of method %s in Validation Aspect\n", joinPoint.getSignature().getName());

    try {

      if(joinPoint.getArgs()[0] == null || joinPoint.getArgs()[0].toString().length() == 0)
        throw new IllegalArgumentException();

      if(joinPoint.getArgs()[1] == null || joinPoint.getArgs()[1].toString().length() == 0)
        throw new IllegalArgumentException();

      if(joinPoint.getArgs()[0].toString().equals(joinPoint.getArgs()[1].toString()))
        throw new UnsupportedOperationException();

    }catch(IllegalArgumentException e) {
      e.printStackTrace();
      System.out.printf("Aborted the executuion of the method %s in validationAspect\n", joinPoint.getSignature().getName());
      throw e;
    } catch(UnsupportedOperationException e) {
      e.printStackTrace();
      System.out.printf("Aborted the executuion of the method %s in validationAspect\n", joinPoint.getSignature().getName());
      throw e;
    }
  }

  @Before("execution(public void edu.sjsu.cmpe275.aop.tweet.TweetService.unblock(..)))")
  public void beforeUnBlock(JoinPoint joinPoint) throws IllegalArgumentException, UnsupportedOperationException {
    System.out.printf("Prior to the execution of method %s in Validation Aspect\n", joinPoint.getSignature().getName());

    try {

      if(joinPoint.getArgs()[0] == null || joinPoint.getArgs()[0].toString().length() == 0)
        throw new IllegalArgumentException();

      if(joinPoint.getArgs()[1] == null || joinPoint.getArgs()[1].toString().length() == 0)
        throw new IllegalArgumentException();

      if(joinPoint.getArgs()[0].toString().equals(joinPoint.getArgs()[1].toString()))
        throw new UnsupportedOperationException();

      String userToBeBlocked = joinPoint.getArgs()[0].toString();
      String userWhoIsBlocking = joinPoint.getArgs()[1].toString();

      if(stats.block.get(userWhoIsBlocking) == null) {
        throw new UnsupportedOperationException();
      } else {
        if(stats.block.get(userWhoIsBlocking).contains(userToBeBlocked)) {

        } else {
          throw new UnsupportedOperationException();
        }
      }

    }catch(IllegalArgumentException e) {
      e.printStackTrace();
      System.out.printf("Aborted the execution of the method %s in validationAspect\n", joinPoint.getSignature().getName());
      throw e;
    } catch(UnsupportedOperationException e) {
      e.printStackTrace();
      System.out.printf("Aborted the execution of the method %s in validationAspect\n", joinPoint.getSignature().getName());
      throw e;
    }
  }

  @Before("execution(public void edu.sjsu.cmpe275.aop.tweet.TweetService.follow(..))")
  public void beforeFollow(JoinPoint joinPoint) throws IllegalArgumentException, UnsupportedOperationException {
    System.out.printf("Prior to the execution of method %s in Validation Aspect\n", joinPoint.getSignature().getName());

    try {

      if(joinPoint.getArgs()[0] == null || joinPoint.getArgs()[0].toString().length() == 0)
        throw new IllegalArgumentException();

      if(joinPoint.getArgs()[1] == null || joinPoint.getArgs()[1].toString().length() == 0)
        throw new IllegalArgumentException();

      if(joinPoint.getArgs()[0].toString().equals(joinPoint.getArgs()[1].toString()))
        throw new UnsupportedOperationException();

    }catch(IllegalArgumentException e) {
      e.printStackTrace();
      System.out.printf("Aborted the executuion of the method %s in validationAspect\n", joinPoint.getSignature().getName());
      throw e;
    } catch(UnsupportedOperationException e) {
      e.printStackTrace();
      System.out.printf("Aborted the executuion of the method %s in validationAspect\n", joinPoint.getSignature().getName());
      throw e;
    }
  }

}
