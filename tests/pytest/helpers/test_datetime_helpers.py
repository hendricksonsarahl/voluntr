import datetime, pytest
from helpers.datetime_helpers import *

# collect tests for get_day function
# TODO


# collect tests for readable_date function
class TestReadableDate():
  # properly formats an easy datetime object
  def test_readable_date_basic(self):
    test_input = datetime.datetime(2017,1,1,12,30)
    assert readable_date(test_input) == "Sunday, January 01, 2017"

  # properly formats an easy datetime object from the past
  def test_readable_date_basic(self):
    test_input = datetime.datetime(2015,1,1,12,30)
    assert readable_date(test_input) == "Thursday, January 01, 2015"

  # properly translates 1/1/2100 to "Flexible schedule"
  def test_readable_date_flexible(self):
    test_input = datetime.datetime(2100,1,1,23,30)
    assert readable_date(test_input) == "Flexible schedule"

  # should raise an exception when given something other than datetime
  def test_readable_date_bad_type(self):
    test_input = "string input"
    with pytest.raises(AttributeError):    
      readable_date(test_input)

  # should raise an exception when given nothing
  def test_readable_date_no_input(self):
    with pytest.raises(TypeError):    
      readable_date()


# collect tests for readable_times function
class TestReadableTimes():
  # properly format an easy PM datetime object
  def test_readable_times_basic(self):
    test_datetime = datetime.datetime(2017,1,1,12,30)
    test_duration = 60
    assert readable_times(test_datetime, test_duration) == '12:30 PM - 1:30 PM'

  # properly format an easy AM datetime object
  def test_readable_times_basic_AM(self):
    test_datetime = datetime.datetime(2017,1,1,10,30)
    test_duration = 60
    assert readable_times(test_datetime, test_duration) == '10:30 AM - 11:30 AM'

  # properly format datetime object with single-digit hours, minutes
  def test_readable_times_single_digit(self):
    test_datetime = datetime.datetime(2017,1,1,5,5)
    test_duration = 60
    assert readable_times(test_datetime, test_duration) == '5:05 AM - 6:05 AM'

  # properly format case when time interval ends at the top of an hour (HH:00)
  def test_readable_times_basic(self):
    test_datetime = datetime.datetime(2017,1,1,12,30)
    test_duration = 30
    assert readable_times(test_datetime, test_duration) == '12:30 PM - 1:00 PM'

  # should raise an exception when given arguments of wrong type
  def test_readable_times_wrong_type(self):
    test_datetime = "string input"
    test_duration = "string input"
    with pytest.raises(AttributeError):    
      readable_times(test_datetime, test_duration)

  # should raise an exception when given only one argument
  def test_readable_times_one_argument(self):
    test_datetime = datetime.datetime(2017,1,1,10,30)
    with pytest.raises(TypeError):    
      readable_times(test_datetime)

  # should raise an exception when given no argument
  def test_readable_times_no_arguments(self):
    with pytest.raises(TypeError):    
      readable_times()


# collect tests for get_duration function
# TODO


# collect tests for create_datetime function
# TODO


# collect tests for get_start_time function
# TODO


# collect tests for get_end_time function
# TODO